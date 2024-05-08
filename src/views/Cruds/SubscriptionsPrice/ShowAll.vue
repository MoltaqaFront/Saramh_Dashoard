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
                <span>{{ $t("BUTTONS.download_invoice") }}</span>
              </template>
              <!-- @click="DownloadInvoice(item)" -->
              <button class="btn_show" @click="downloadPdf(item)">
                <i class="fal fa-download"></i>
              </button>
            </a-tooltip>
          </div>
        </template>
        <!-- End:: Actions -->
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

     <!-- Start:: Generate PDF Template Content -->
    <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
      filename="report" :pdf-quality="1" pdf-format="a4" :manual-pagination="false" :paginate-elements-by-height="1500"
      pdf-content-width="100%" @progress="bdfDownloadBtnIsLoading = true"
      @hasGenerated="$message.success($t('MESSAGES.generatedSuccessfully'))" ref="html2Pdf">
      <section slot="pdf-content">
        <div class="pdf_file_content ">
          <h4 class="mx-5 text-center">{{ $t("BUTTONS.Invoiceimage") }}</h4>
          <table class="table table-striped my-10">
            <tbody>
               <tr class="file_title">
                  <td>{{ $t("PLACEHOLDERS.qr") }}</td>
                  <td ><span v-html="qr"></span></td>
                </tr>

                <tr class="file_title">
                  <td>{{ $t("TABLES.subscriptions.number") }}</td>
                  <td>{{ serialNumber }}</td>
                </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.date") }}</td>
                <td>{{ date }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.nameclient") }}</td>
                <td>{{ nameclient }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.coach") }}</td>
                <td>{{ coach }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.program") }}</td>
                <td>{{ program }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.programPrice") }}</td>
                <td>{{ programPrice }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.AddedTax") }}</td>
                <td>{{ AddedTax }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.totalPriceOrder") }}</td>
                <td>{{ totalPriceOrder }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.vatApp") }}</td>
                <td>{{ vatApp }}</td>
              </tr>

              <tr class="file_title">
                <td>{{ $t("TABLES.subscriptions.priceCoach") }}</td>
                <td>{{ priceCoach }}</td>
              </tr>
<!-- 
             <h4 class="text-center mx-10">{{ $t("PLACEHOLDERS.qr") }}</h4>
               <tr class="text-center mx-10">
                <td ><span v-html="qr"></span></td>
              </tr> -->
            </tbody>
          </table>
        
        </div>
      </section>
    </vue-html2pdf>
    <!-- End:: Generate PDF Template Content -->
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
  name: "AllOrders",

 components: {
    VueHtml2pdf
  },
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
       permissions: null,
      file: null,
      date: null,
      serialNumber: null,
      qr:null,
      nameclient: null,
      coach: null,
      program: null,
      dataPrice: null,
      programPrice: null,
      AddedTax: null,
      totalPriceOrder: null,
      vatApp: null,
      priceCoach: null
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
      this.$router.push({ path: `/SubscriptionsPrice/show/${item.id}` });
    },
    // subscription(item) {
    //   this.$router.push({path: `/SubscriptionsPrice/price/${item.user.id}`})
    // },
    // ===== End:: End

    // ===== Start:: Delete
    async downloadPdf(item) {
      // console.log(item);
     if (item) {
        this.serialNumber = item.id;
        this.date = item.created_at;
        this.nameclient = item.user.name;
        this.coach = item.coach.name;
        this.program = item.program.name;
        this.qr = item.qrcode;
        this.programPrice = item.net_price;
        this.AddedTax = item.tax;
        this.totalPriceOrder = item.total;
        this.vatApp = item.commission;
        this.priceCoach = item.net_profit;

        await this.$refs.html2Pdf.generatePdf();
        this.pdfDownloadBtnIsLoading = false;
      } else {
        console.error("Item is undefined or null.");
      }
    },
    // ===== End:: Delete
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
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
.pdf_file_content{
  position: relative;
  top: 50px;

}

</style>