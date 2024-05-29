<template>
  <div class="show_all_content_wrapper">
    <!-- Start:: Main Section -->
    <main>
      <!--  =========== Start:: Filter Form =========== -->
      <div class="filter_content_wrapper" :class="{ active: filterFormIsActive }">
        <button class="filter_toggler" @click="filterFormIsActive = !filterFormIsActive">
          <i class="fal fa-times"></i>
        </button>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("TITLES.AllClients") }}</h5>
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

        <template v-slot:[`item.serialNumber`]="{ item }">
          <p class="blue-grey--text text--darken-1 fs-3" v-if="!item.serialNumber">-</p>
          <p v-else>{{ item.serialNumber }}</p>
        </template>
        <!-- Start:: Name -->
        <template v-slot:[`item.name`]="{ item }">
          <h6 class="text-danger" v-if="!item.name"> {{ $t("TABLES.noData") }} </h6>
          <h6 v-else> {{ item.name }} </h6>
        </template>

         <!-- Start:: Phone -->
        <template v-slot:[`item.mobile`]="{ item }">
          <span class="text-danger" v-if="!item.mobile"> {{ $t("TABLES.noData") }} </span>
          <span v-else> {{ item.mobile }} </span>
        </template>
        <!-- End:: Phone -->
        
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
  name: "AllRates",

  computed: {
    ...mapGetters({
      getAppLocale: "AppLangModule/getAppLocale",
    })
  },

  data() {
    return {
      // Start:: Loading Data
      loading: false,
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Filter Data
      filterFormIsActive: false,
      providers_list: [],
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
        tableHeaders: [
        {
          text: this.$t("TABLES.subscriptions.serialNumber"),
          value: "serialNumber",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.name"),
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.Clients.phone"),
          value: "mobile",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.prgram_price"),
          value: "net_price",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t("TABLES.subscriptions.AddedTax"),
          value: "tax",
          align: "center",
          sortable: false, 
        },
        {
          text: this.$t("TABLES.subscriptions.TotalSubscription"),
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
      ],
      tableRows: [],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogComment: false,
      selectedCommentTextToShow: "",
      dialogBalance: false,
      itemToBalance: null,
      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

      status_word: '',
      balance_package:'',

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
        await this.$router.push({ path: '/rates/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.status = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/rates/all', query: { page: 1 } });
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
        let res = await this.$axios({
          method: "GET",
          url: `coaches/coach-client-subscriptions/${this.$route.params.id}`,
          params: {
            page: this.paginations.current_page
          },
        });
        this.loading = false;
        res.data.data.forEach((item, index) => {
          item.serialNumber = (this.paginations.current_page - 1) * this.paginations.items_per_page + index + 1;
        });
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows

    // Start:: Control Modals
    showCommentModal(comment) {
      this.dialogComment = true;
      this.selectedCommentTextToShow = comment;
    },
    // End:: Control Modals

    // Start:: Change Activation Status
    // async changeActivationStatus(item) {
    //   if (item.is_active == "new") {
    //     this.status_word = "unpublished"
    //   } else {
    //     this.status_word = "published"
    //   }
    //   try {
    //     await this.$axios({
    //       method: "POST",
    //       url: `rates/${item.id}`, 
    //       data: { status: this.status_word }
    //     });
    //     this.$message.success(this.$t("MESSAGES.changedSuccessfully"));
    //   } catch (error) {
    //     this.$message.error(error.response.data.message);
    //   }
    // },
    // End:: Change Activation Status
      showItem(item) {
      this.$router.push({ path: `/rates/show/${item.id}` });
    },
      // ===== Start:: balance
      selectAcceptItem(item) {
      console.log("item",item);
      this.dialogBalance = true;
      this.itemToBalance = item;

      this.balance_package = item.comment;

    },
      selectUpdateItem(item) {
      this.dialogUpdate = true;
      this.itemToUpdate = item;
      // console.log(item);
    },
     async confirmAccept(item) {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `rates/publishing/${item.id}`,
          data: { status: "published" }
        });
        this.setTableRows();
        this.$message.success(res.data.message);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
     async confirmChangeStatus(item) {
      try {
        let res = await this.$axios({
          method: "POST",
          url: `rates/publishing/${item.id}`,
          data: { status: "unpublished" }
        });
        this.setTableRows();
        this.$message.success(res.data.message);
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },

  //   async confirmAccept(item , Content) {
  //     const REQUEST_DATA = {};
  //     if (this.status === "unpublished") {
  //   // If current status is unpublished, change it to published
  //   REQUEST_DATA.status = "published";
  // } else if (this.status === "new") {
  //   // If current status is new, change it to unpublished
  //   REQUEST_DATA.status = "unpublished";
  // } else if (this.status === "published") {
  //   // If current status is published, change it to unpublished
  //   REQUEST_DATA.status = "unpublished";
  // }
  //     // if (this.status == "new") {
  //     //   console.log("object" , Content);
  //     //   // REQUEST_DATA.status = "new";
  //     //    REQUEST_DATA.status = Content
  //     // } else if (this.status == "published"){
  //     //   REQUEST_DATA.status = "unpublished";
  //     // } else {
  //     //   REQUEST_DATA.status = "unpublished";
  //     // }
  //     try {
  //       let res = await this.$axios({
  //         method: "POST",
  //         url: `rates/publishing/${item.id}`,
  //         data: REQUEST_DATA
  //       });
  //       this.setTableRows();
  //       this.$message.success(res.data.message);
  //     } catch (error) {
  //       this.$message.error(error.response.data.message);
  //     }
  //   },
    // ===== End:: balance
   
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

</style>