<template>
  <div class="show_all_content_wrapper">

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form>

        
           <transition-group name="fade" v-if="receivedMessages.length">
            <div class="notification" v-for="(message, index) in receivedMessages" :key="'k' + index">

            <!-- start :: rate -->
            <router-link v-if="message.data.notification_type == 'new_subscription'" :to="`/SubscriptionsPrice/show/${message.data.notification_id}`">
              <h3>{{ message.data.title }}</h3>
              <p>{{ message.data.body }}</p>

              <div v-if="message.id" :class="{ 'read': message.is_read == 1 }" class="delete_notification"
                @click="NotificationsReaded(message.id)">
                <i class="fas fa-check-double"></i>
              </div>
            </router-link>
            <!-- End :: rate -->

            <!-- start :: contact -->
            <router-link v-if="message.data.notification_type == 'contact_us'" :to="'/contact-messages/all'">
              <h3>{{ message.data.title }}</h3>
              <p>{{ message.data.body }}</p>

              <div v-if="message.id" :class="{ 'read': message.is_read == true }" class="delete_notification"
                @click="NotificationsReaded(message.id)">
                <i class="fas fa-check-double"></i>
              </div>
            </router-link>
            <!-- End :: contact -->

            <!-- start :: users -->
            <router-link v-if="message.data.notification_type == 'new_client'" :to="`/clients/show/${message.data.notification_id}`">
              <h3>{{ message.data.title }}</h3>
              <p>{{ message.data.body }}</p>

              <div v-if="message.id" :class="{ 'read': message.is_read == true }" class="delete_notification"
                @click="NotificationsReaded(message.id)">
                <i class="fas fa-check-double"></i>
              </div>
            </router-link>
            <!-- End :: users -->

            <!-- start :: delete_account -->
            <router-link v-if="message.data.notification_type == 'delete_account'" :to="'/clients/all'">
              <h3>{{ message.data.title }}</h3>
              <p>{{ message.data.body }}</p>
              <div v-if="message.id" :class="{ 'read': message.is_read == true }" class="delete_notification"
                @click="NotificationsReaded(message.id)">
                <i class="fas fa-check-double"></i>
              </div>
            </router-link>
            <!-- End :: delete_account -->           


          </div>

        </transition-group>
        
        <!-- <transition-group name="fade" v-if="receivedMessages.length">
          <div class="notification" v-for="(message, index) in receivedMessages" :key="'k' + index">

            <h3>{{ message.data.title }}</h3>
            <p>{{ message.data.body }}</p>

            <div v-if="message.id" :class="{ 'read': message.is_read == true }" class="delete_notification"
              @click="NotificationsReaded(message.id)">
              <i class="fas fa-check-double"></i>
            </div>

          </div>

        </transition-group> -->

        <p class="text-danger text-center text--darken-4 pt-5 pb-5" v-else>{{ $t('PLACEHOLDERS.no_notifications') }}</p>

        <!-- Start:: Pagination -->
        <template>
          <div class="pagination_container text-center mt-3 mb-0">
            <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
              :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
                " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'" />
          </div>
        </template>
        <!-- End:: Pagination -->

      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import { mapGetters  , mapActions} from "vuex";
export default {
  name: "CreateContact",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      receivedMessages: [],

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

    };
  },

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.getData();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {

    ...mapActions({
      readAllNotifications: "NotificationsModule/readAllNotifications",
    }),

     updateRouterQueryParam(pagenationValue) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: pagenationValue,
        },
      });

      // Scroll To Screen's Top After Get Products
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },

    async getData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "notification/user-notifications",
          params: {
            page: this.paginations.current_page
          },
        });
        console.log("All Data ==>", res);
        this.receivedMessages = res.data.data;
        console.log("objec" , this.receivedMessages);
       this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    async NotificationsReaded(item_id) {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `notification/mark-as-read`,
          params: {
            "notification_id" : item_id
          }
        });
        this.$message.success(res.data.message);
        this.getData();
        this.readAllNotifications();
        this.notificationsData.unreadNotifications--;
        console.log("notificationsData.unreadNotifications", this.notificationsData.unreadNotifications)
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },

    async DeleteNotification(item_id) {
      try {
        let res = await this.$axios({
          method: "DELETE",
          url: `notifications/${item_id}`
        });
        this.$message.success(res.data.message);
        this.getData();
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.errors);
      }
    },



  },

  created() {
    this.getData();

    navigator.serviceWorker.addEventListener('message', event => {
      const receivedMessage = event.data.data;

      this.receivedMessages.unshift(receivedMessage);

      console.log(event.data.data)
      // console.log("receivedMessage", event)
      // Update component state or display the received message in the UI
    });

    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }

  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.notification {
  background: #000;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  position: relative;

  .delete_notification {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;

    &.read {
      i {
        color: #49a956;
      }
    }

    i {
      font-size: 20px;
      color: #DDD
    }
    
  }
}

.text-danger {
  font-size: 22px
}
</style>
