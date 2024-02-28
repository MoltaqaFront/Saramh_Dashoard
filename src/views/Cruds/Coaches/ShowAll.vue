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
              <base-input col="4" type="text" :placeholder="$t('TABLES.coaches.name')"
                v-model.trim="filterOptions.name" />
              <!-- End:: Name Input -->

               <!-- Start:: Phone Input -->
                <base-input col="4" type="tel" :placeholder="$t('PLACEHOLDERS.phone')" v-model.trim="filterOptions.phone" />
                <!-- End:: Phone Input -->

                 <!-- Start:: main Input -->
                <base-select-input col="4" :optionsList="main" :placeholder="$t('TABLES.coaches.main')"
                  v-model="filterOptions.specialty" />
                <!-- End:: Status Input -->

                 <!-- Start:: Status Input -->
                <base-select-input col="4" :optionsList="special" :placeholder="$t('TABLES.coaches.sub')"
                  v-model="filterOptions.subspecialty" />
                <!-- End:: Status Input -->
              <!-- Start:: Status Input -->
              <base-select-input col="4" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                v-model="filterOptions.isActive" />
              <!-- End:: Status Input -->
               <base-select-input col="4" :optionsList="is_show" :placeholder="$t('TABLES.coaches.isAvailable')"
                  v-model="filterOptions.available" />
                <!-- End:: Status Input -->
            </div>

            <div class="btns_wrapper">
              <button class="submit_btn" :disabled="isWaitingRequest">
                <i class="fal fa-search"></i>
              </button>
              <button class="reset_btn" type="button" :disabled="isWaitingRequest" @click="resetFilter">
                <i class="fal fa-redo"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <!--  =========== End:: Filter Form =========== -->

      <!--  =========== Start:: Table Title =========== -->
      <div class="table_title_wrapper">
        <div class="title_text_wrapper">
          <h5>{{ $t("SIDENAV.Coaches.title") }}</h5>
          <button v-if="!filterFormIsActive" class="filter_toggler"
            @click.stop="filterFormIsActive = !filterFormIsActive">
            <i class="fal fa-search"></i>
          </button>
        </div>

        <div class="title_route_wrapper">
          <router-link to="/Coaches/create">
            {{ $t("SIDENAV.Coaches.add") }}
          </router-link>
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

        <!-- Start:: Item Image -->
        <template v-slot:[`item.image`]="{ item }">
          <div class="table_image_wrapper">
            <h6 class="text-danger" v-if="!item.image"> {{ $t("TABLES.noData") }} </h6>

            <button class="my-1" @click="showImageModal(item.image)" v-else>
              <img class="rounded" :src="item.image" :alt="item.name" width="60" height="60" />
            </button>
          </div>
        </template>
        <!-- End:: Item Image -->

        <!-- Start:: Activation Status -->
        <template v-slot:[`item.is_active`]="{ item }">
          <span class="text-success text-h5" v-if="item.is_active">
            <i class="far fa-check"></i>
          </span>
          <span class="text-danger text-h5" v-else>
            <i class="far fa-times"></i>
          </span>
        </template>
        <!-- End:: Activation Status -->

          <!-- Start:: Activation Status -->
          <template v-slot:[`item.available`]="{ item }">
            <span class="text-success text-h5" v-if="item.available">
              <i class="fas fa-lock-open"></i>
            </span>
            <span class="text-danger text-h5" v-else>
              <i class="fas fa-lock"></i>
            </span>
          </template>
          <!-- End:: Activation Status -->


        <!-- Start:: Actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.show") }}</span>
              </template>
              <button class="btn_show" @click="showItem(item)">
                <i class="fal fa-eye"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.edit") }}</span>
              </template>
              <button class="btn_edit" @click="editItem(item)">
                <i class="fal fa-edit"></i>
              </button>
            </a-tooltip>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ $t("BUTTONS.delete") }}</span>
              </template>
              <button class="btn_delete" @click="selectDeleteItem(item)">
                <i class="fal fa-trash-alt"></i>
              </button>
            </a-tooltip>

            <template>
              <a-tooltip placement="bottom" v-if="!item.is_active">
                <template slot="title">
                  <span>{{ $t("BUTTONS.activate") }}</span>
                </template>
                <button class="btn_activate" @click="changeActivationStatus(item)">
                  <i class="fad fa-check-circle"></i>
                </button>
              </a-tooltip>
              <a-tooltip placement="bottom" v-if="item.is_active">
                <template slot="title">
                  <span>{{ $t("BUTTONS.deactivate") }}</span>
                </template>
                <button class="btn_deactivate" @click="changeActivationStatus(item)">
                  <i class="fad fa-times-circle"></i>
                </button>
              </a-tooltip>
            </template>

            <template>
                <a-tooltip placement="bottom" v-if="!item.available">
                  <template slot="title">
                    <span>{{ $t("BUTTONS.available") }}</span>
                  </template>
                  <button class="btn_activate" @click="changeAvailableStatus(item)">
                    <i class="fas fa-lock-open"></i>
                  </button>
                </a-tooltip>
                <a-tooltip placement="bottom" v-if="item.available">
                  <template slot="title">
                    <span>{{ $t("BUTTONS.disavailable") }}</span>
                  </template>
                  <button class="btn_deactivate" @click="changeAvailableStatus(item)">
                    <i class="fas fa-lock"></i>
                  </button>
                </a-tooltip>
              </template>
          </div>
        </template>
        <!-- End:: Actions -->

        <!-- ======================== Start:: Dialogs ======================== -->
        <template v-slot:top>
          <!-- Start:: Delete Modal -->
          <v-dialog v-model="dialogDelete">
            <v-card>
              <v-card-title class="text-h5 justify-center" v-if="itemToDelete">
                {{ $t("TITLES.DeleteConfirmingMessage", { name: itemToDelete.name }) }}
              </v-card-title>
              <v-card-actions>
                <v-btn class="modal_confirm_btn" @click="confirmDeleteItem">{{
                  $t("BUTTONS.ok")
                }}</v-btn>

                <v-btn class="modal_cancel_btn" @click="dialogDelete = false">{{ $t("BUTTONS.cancel") }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- End:: Delete Modal -->
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
  name: "AllCoaches",

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
     is_show() {
      return [
        {
          id: 1,
          name: this.$t("BUTTONS.available"),
          value: 1,
        },
        {
          id: 0,
          name: this.$t("BUTTONS.disavailable"),
          value: 0,
        }
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
        specialty: null,
        subspecialty: null,
        isActive: null,
        available: null
      },
      // End:: Filter Data

      // Start:: Table Data
      searchValue: "",
      tableHeaders: [
        {
          text: this.$t("TABLES.coaches.serialNumber"),
          value: "serialNumber",
          align: "center",
          width: "80",
          sortable: false,
        },
        {
          text: this.$t("TABLES.coaches.name"),
          value: "name",
          align: "center",
          sortable: false,
          width: "150"
        },
        {
          text: this.$t("TABLES.coaches.phone"),
          value: "mobile",
          align: "center",
          sortable: false,
        },
         {
          text: this.$t("TABLES.coaches.main"),
          value: "specialty.name",
          align: "center",
           sortable: false,
          width: "150"
        },
        {
          text: this.$t("TABLES.coaches.sub"),
          value: "subspecialty.name",
          align: "center",
          sortable: false,
          width: "150"
        },
        {
          text: this.$t("PLACEHOLDERS.status"),
          value: "is_active",
          align: "center",
          width: "120",
          sortable: false,
        },
        {
          text: this.$t("TABLES.coaches.isAvailable"),
          value: "available",
          align: "center",
          sortable: false,
          width: "100"
        },
        {
          text: this.$t("TABLES.Admins.actions"),
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      tableRows: [],
      main: [],
      special:[],
      // End:: Table Data

      // Start:: Dialogs Control Data
      dialogImage: false,
      selectedItemImage: null,
      dialogDeactivate: false,
      itemToChangeActivationStatus: null,
      deactivateReason: null,
      dialogDelete: false,
      itemToDelete: null,
      itemToChangeAvailableStatus: null,
      dialogAvailable: null,

      // End:: Dialogs Control Data

      // Start:: Pagination Data
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 6,
      },
      // End:: Pagination Data

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
        await this.$router.push({ path: '/Coaches/all', query: { page: 1 } });
      }
      this.setTableRows();
    },
    async resetFilter() {
      this.filterOptions.name = null;
      this.filterOptions.phone = null;
      this.filterOptions.specialty = null;
      this.filterOptions.subspecialty = null;
      this.filterOptions.isActive = null;
      this.filterOptions.available = null;
      if (this.$route.query.page !== '1') {
        await this.$router.push({ path: '/Coaches/all', query: { page: 1 } });
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
          url: "coaches",
          params: {
            page: this.paginations.current_page,
            name: this.filterOptions.name,
            mobile: this.filterOptions.phone,
            specialty: this.filterOptions.specialty,
            subspecialty: this.filterOptions.subspecialty,
            is_active: this.filterOptions.isActive?.value,
            available: this.filterOptions.available?.value,
          },
        });
        this.loading = false;
         res.data.data.forEach((item, index) => {
          item.serialNumber = (this.paginations.current_page - 1) * this.paginations.items_per_page + index + 1;
        });
        // console.log("All Data ==>", res.data.data);
        this.tableRows = res.data.data;
        this.paginations.last_page = res.data.meta.last_page;
        this.paginations.items_per_page = res.data.meta.per_page;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // End:: Set Table Rows
    // ===== Start:: Handling Activation & Deactivation
    selectDeactivateItem(item) {
      this.dialogDeactivate = true;
      this.itemToChangeActivationStatus = item;
    },
    async changeActivationStatus(item) {
      try {
        await this.$axios({
          method: "POST",
          url: `coaches/activate/${item.id}`,
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changeActivation"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ===== End:: Handling Activation & Deactivation
    selectAvailableItem(item) {
      this.dialogAvailable = true;
      this.itemToChangeAvailableStatus = item;
    },
    async changeAvailableStatus(item) {
      try {
        await this.$axios({
          method: "POST",
          url: `coaches/availabilty/${item.id}`,
        });
        this.setTableRows();
        this.$message.success(this.$t("MESSAGES.changeAvailable"));
      } catch (error) {
        this.$message.error(error.response.data.message);
      }
    },
    // ==================== Start:: Crud ====================
    // ===== Start:: End
    editItem(item) {
      this.$router.push({ path: `/Coaches/edit/${item.id}` });
    },
    showItem(item) {
      this.$router.push({ path: `/Coaches/show/${item.id}` });
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
          url: `coaches/${this.itemToDelete.id}`,
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

    async getMain() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `specialties`,
          params: {
            "status": 1
          }
        });
        // console.log("Cities =>", res.data.data);
        this.main = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
     async getSpecial() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `subspecialties`,
          params: {
            "status": 1
          }
        });
        // console.log("Cities =>", res.data.data);
        this.special = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
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
    this.getMain();
    this.getSpecial();
    // End:: Fire Methods
  },
};
</script>
