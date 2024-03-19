<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("SIDENAV.dashboard") }}</h5>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
       <!-- <ComingSoon /> -->
      <div class="statics mt-4">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12" v-for="(value, key) in statics" :key="'i' + key">
          <div class="box">
            <div class="icon">
              <i v-if="key === 'users'" class="fas fa-users"></i>

              <i v-else-if="key === 'admins'" class="fas fa-users-cog"></i>
              <i v-else-if="key === 'coaches'" class="fab fa-playstation"></i>


              <i v-else-if="key === 'subscriptions'" class="fas fa-cart-plus"></i>
              <i v-else-if="key === 'profit'" class="fas fa-dollar-sign"></i>
            </div>
            <div class="info_box">
              <span v-if="key == 'users'">{{ $t('TABLES.Users.number') }}</span>

              <span v-else-if="key === 'admins'">{{ $t('TABLES.Admins.number')
              }}</span>

              <span v-else-if="key === 'coaches'">{{ $t('TABLES.coaches.number') }}</span>

              <span v-else-if="key === 'subscriptions'">{{ $t('TABLES.coaches.totalnum') }}</span>
              <span v-else-if="key === 'profit'">{{ $t('PLACEHOLDERS.total') }}</span>

              <p class="number_box">{{ value }}</p>
            </div>
          </div>
        </div>
        </div>
    </div>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->
  </div>
</template>

<script>
import ComingSoon from "@/components/ui/ComingSoon.vue";

export default {
  name: "HomePage",

  components: {
    ComingSoon
  },

  data() {
    return {
      statics: []
    };
  },

  methods: {

    async getStatics() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: "statistics"
        });

        // console.log("All Data ==>", res.data.data);
        this.statics = res.data.data;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

  },

  mounted() {

    this.getStatics()

  },
};
</script>

<style lang="scss" scoped>
.show_all_content_wrapper {
  .statics {
    .box {
      background: #57009B;
      padding: 25px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      justify-content: space-between;

      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        .icon {
          i{
            color: #57009B;
          }
        }
        .info_box {

          span,
          p.number_box {
            color: #000
          }
        }
      }

      .icon {
        height: 60px;
        min-width: 60px;
        width: 60px;
        border-radius: 60px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 25px ;
          color: #000;
        }
      }

      .info_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        span {
          font-size: 19px;
          color: #FFF;
        }

        p.number_box {
          font-size: 30px;
          color: #FFF;
          font-weight: bold;
        }
      }
    }
  }

}
</style>