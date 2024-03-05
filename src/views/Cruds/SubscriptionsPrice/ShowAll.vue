<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
        <div class="filter_title_wrapper">
          <h5>{{ $t("TITLES.searchBy") }}</h5>
        </div>
        <div class="filter_form_wrapper">
          <form @submit.prevent="submitFilterForm">
            <div class="row justify-content-center align-items-center w-100">
              <!-- Start:: Name Input -->
              <base-input col="4" type="text" :placeholder="$t('TABLES.subscriptions.nameclient')" v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="4" type="tel" :placeholder="$t('TABLES.subscriptions.phone')" v-model.trim="filterOptions.phone" />
              <!-- End:: Phone Input -->

                <!-- Start:: Phone Input -->
              <base-input col="4" type="text" :placeholder="$t('TABLES.subscriptions.coach')" v-model.trim="filterOptions.coach" />
              <!-- End:: Phone Input -->

             <!-- Start:: Start Date Input -->
              <base-picker-input col="4" type="date" :placeholder="$t('TABLES.subscriptions.starSubscription')"
                v-model.trim="filterOptions.from_date" />
              <!-- End:: Start Date Input -->

              <!-- Start:: End Date Input -->
              <base-picker-input col="4" type="date" :placeholder="$t('TABLES.subscriptions.endSubscription')"
                v-model.trim="filterOptions.to_date" />
              <!-- End:: End Date Input -->

            </div>

            <div class="btns_wrapper">

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.search") }}</span>
                </template>
                <span class="submit_btn" @click="submitFilterForm" :disabled="isWaitingRequest">
                  <i class="fal fa-search"></i>
                </span>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>{{ $t("BUTTONS.rseet_search") }}</span>
                </template>
                <span class="reset_btn" :disabled="isWaitingRequest" @click="resetFilter">
                  <i class="fal fa-redo"></i>
                </span>
              </a-tooltip>

            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("SIDENAV.SubscriptionsPrice.title") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>
      </div>
      <!--  =========== End:: Table Title =========== -->

      <!--  =========== Start:: Data Table =========== -->
      <v-data-table class="thumb" :loading="loading" :loading-text="$t('TABLES.loadingData')" :search="searchValue"
        :headers="tableHeaders" :items="tableRows" item-class="ltr" :items-per-page="paginations.items_per_page"
        hide-default-footer>
        <!-- Start:: No Data State -->
        <template v-slot:no-data>
          {{ $t("TABLES.noData") }}
        </template>
        <!-- Start:: No Data State -->

        <template v-slot:[`item.serialNumber`]="{ item, index }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.serialNumber"> {{ $t("TABLES.noData") }} </h6>
            <p v-else>{{ (paginations.current_page - 1) * paginations.items_per_page + index + 1 }}</p>
          </div>
        </template>

        <!-- Start:: Name -->
        <template v-slot:[`item.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.name"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ item.name }} </h6>
        </template>
        <!-- End:: Name -->

        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom" >
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.subscriptions") }}</span>
              </template>

              <button class="btn_edit" @click="subscription(item)">
                <i class="fas fa-cash-register"></i>
              </button>
            </a-tooltip>
           
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>

          <!-- Start:: Balance Modal -->
          <!-- <v-dialog v-model="dialogBalance">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToBalance">
                <span>{{ $t('PLACEHOLDERS.current_balance') }} : </span>
                <span>{{ itemToBalance.balance }}</span>
              </v-card-title>

              <form class="w-100">

                <base-input col="12" type="text" :placeholder="$t('PLACEHOLDERS.current_balance')"
                  v-model.trim="balance_package" required />
              </form>

              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmAcceptItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogBalance = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
          <!-- End:: Balance Modal -->

        </template>
        <!-- ======================== End:: Dialogs ======================== -->

      </v-data-table>
      <!--  =========== End:: Data Table =========== -->
    </main>
    <!-- End:: Main Section -->

    <!-- Start:: Pagination -->
    <template>
      <div class="pagination_container text-center mt-3 mb-0">
        <v-pagination class="py-0" square v-model="paginations.current_page" :length="paginations.last_page"
          :total-visible="6" @input="updateRouterQueryParam($event)" :prev-icon="getAppLocale == 'ar' ? 'fal fa-angle-right' : 'fal fa-angle-left'
            " :next-icon="getAppLocale == 'ar' ? 'fal fa-angle-left' : 'fal fa-angle-right'
    " />
      </div>
    </template>
    <!-- End:: Pagination -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AllClients",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    }),

    activeStatuses() {
      return [
        {
          id: 1,
          name: this.$t("STATUS.active"),
          value: 1,
        },
        {
          id: 2,
          name: this.$t("STATUS.notActive"),
          value: 0,
        },
      ];
    },
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      filterOptions: {
        name: null,
        phone: null,
        coach: null,
        to_date: null,
        from_date: null,
        isActive: null,
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.Clients.serialNumber"),
          value: "serialNumber",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.number"),
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.nameclient"),
          value: "user.name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.phone"),
          value: "user.mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.coach"),
          value: "coach.name",
          align: "center",
          sortable: false,
        },
         {
          text: this.$t("TABLES.subscriptions.program"),
          value: "program.name",
          align: "center",
          sortable: false,
        },
         {
          text: this.$t("TABLES.subscriptions.Totalorder"),
          value: "total",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.date"),
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,

      dialogBalance: false,
      itemToBalance: null,
      // Start:: Page Permissions
       permissions: null,
      // Start:: Page Permissions

    };
  },

  watch: {
    // Start:: Page Query Param Watcher To Get Page Data Based On It's Change
    ["$route.query.page"]() {
      this.paginations.current_page = +this.$route.query.page;
      this.setTableRows();
    },
    // End:: Page Query Param Watcher To Get Page Data Based On It's Change
  },

  methods: {
    // Start:: Handel Filter
    async submitFilterForm() {
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/SubscriptionsPrice/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.from_date = null;
      this.filterOptions.to_date = null;
      this.filterOptions.coach = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/SubscriptionsPrice/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    // End:: Handel Filter

    // Start:: Set Table Rows
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
    async setTableRows() {
      this.loading = true;
      try {

        let nameParam = this.filterOptions.name;
        if (!nameParam) {
          nameParam = null;
        }

        let res = await this.$axios({
          method: "GET",
          url: "subscriptions",
          params: {
            page: this.paginations.current_page,
            user: this.filterOptions.name,
            mobile: this.filterOptions.phone,
            coach: this.filterOptions.coach,
            from: this.filterOptions.from_date,
            to: this.filterOptions.to_date,
          },
        });
        this.loading = false;
         res.data.data.forEach((item, index) => {
          item.serialNumber = (this.paginations.current_page - 1) * this.paginations.items_per_page + index + 1;
        });
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

  
    // End:: Control Modals

    // ==================== Start:: Crud ====================
    // ===== Start:: End
    showItem(item) {
      this.$router.push({ path: `/SubscriptionsPrice/show/${item.user.id}` });
    },
    subscription(item) {
      this.$router.push({path: `/SubscriptionsPrice/price/${item.user.id}`})
    },
    // ===== End:: End

    // ===== Start:: Delete
    selectDeleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },
    async confirmDeleteItem() {
      try {
        await this.$axios({
          method: "DELETE",
          url: `clients/${this.itemToDelete.id}`,
        });
        this.dialogDelete = false;
        this.tableRows = this.tableRows.filter((item) => {
          return item.id != this.itemToDelete.id;
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Delete
    // ==================== End:: Crud ====================
  },

  created() {
    // Start:: Fire Methods
    window.addEventListener("click", () => {
      this.filterFormIsActive = false;
    });
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setTableRows();
    // End:: Fire Methods
  },
};
</script>
<style>
span.submit_btn {
  width: 45px;
  height: 45px;
  font-size: 16px;
  border-radius: 10px;
  color: var(--white_clr);
  transition: all 0.3s linear;
  background-color: #F6A513;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>