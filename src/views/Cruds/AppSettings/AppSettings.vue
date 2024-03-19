<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Single Step Form Content -->
      <div class="table_title_wrapper">
          <div class="title_text_wrapper">
            <h5 style="color: #57009B;">{{ $t("SIDENAV.settings.title") }}</h5>
          </div>
    </div>
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.VAT_percentage')"
            v-model.trim="data.VAT_percentage" />
          <!-- End:: Name Input -->

          <!-- Start:: Status Input -->
          <base-input col="6" type="number" :placeholder="$t('PLACEHOLDERS.AppVet')"
            v-model="data.AppVet" />
          <!-- End:: Status Input -->


          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
export default {
  name: "GeneralSettings",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data
      data: {
        VAT_percentage: null,
        AppVet: null
       
      },
      // End:: Data

    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData"
    }),
    // End:: Vuex Getters
  },


  methods: {

    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=dashboard_settings`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.VAT_percentage = res.data.data[0].value.tax;
        this.data.AppVet = res.data.data[0].value.commission;

      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: Submit Form
    async submitForm() {
      this.isWaitingRequest = !this.isWaitingRequest;

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "dashboard_settings");
      REQUEST_DATA.append("value[tax]", this.data.VAT_percentage);
      REQUEST_DATA.append("value[commission]", this.data.AppVet);

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `settings`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.savedSuccessfully"));
        this.getDataToEdit();
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.errors);
      }
    },
    // End:: Submit Form

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

       if (!this.data.VAT_percentage || this.data.VAT_percentage === 'null') {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.AtxSalery"));
        return;
      }
      else if (this.data.VAT_percentage < 1 || this.data.VAT_percentage > 100) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.custom_value_range_required"));
        } else if (!this.data.AppVet || this.data.AppVet === 'null') {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.reports_to_block_auto_ad_required"));
        return;
      } else if (this.data.AppVet < 1 || this.data.AppVet > 100) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.AppVet"));
        return;
      }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>


<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px
}

.add_another {
  border: none;
  padding: 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--light_gray_clr);
  border-radius: 50%;
  font-size: 18px;
  color: var(--light_gray_clr);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}
</style>