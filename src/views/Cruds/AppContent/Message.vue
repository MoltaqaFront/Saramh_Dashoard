<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.AppContent.message") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <h3>{{ $t("SIDENAV.AppContent.Vision") }}</h3>
          <!-- Start:: Ar Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentAr')" v-model.trim="data.visionAr" required />
          <!-- End:: Ar Content Text Editor -->

          <!-- Start:: En Content Text Editor -->
          <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentEn')" v-model.trim="data.visionEn" required />

          <!-- Start:: En Content Text Editor -->
          <h3>{{ $t("SIDENAV.AppContent.mission") }}</h3>
            <!-- Start:: Ar Content Text Editor -->
            <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentAr')" v-model.trim="data.missionAr" required />
            <!-- End:: Ar Content Text Editor -->

            <!-- Start:: En Content Text Editor -->
            <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentEn')" v-model.trim="data.missionEn" required />

            <h3>{{ $t("SIDENAV.AppContent.goals") }}</h3>
            <!-- Start:: Ar Content Text Editor -->
            <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentAr')" v-model.trim="data.goalAr" required />
            <!-- End:: Ar Content Text Editor -->

            <!-- Start:: En Content Text Editor -->
            <base-text-editor col="6" :placeholder="$t('PLACEHOLDERS.contentEn')" v-model.trim="data.goalEn" required />

          <!-- Start:: Submit Button Wrapper -->
          <div class="btn_wrapper">
            <base-button class="mt-2" styleType="primary_btn" :btnText="$t('BUTTONS.save')" :isLoading="isWaitingRequest"
              :disabled="isWaitingRequest" />
          </div>
          <!-- End:: Submit Button Wrapper -->
        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        goalAr: null,
        goalEn: null,
        visionAr: null,
        visionEn: null,
        missionAr: null,
        missionEn: null,
      },
      // End:: Data Collection To Send
    };
  },

  methods: {
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=vision`,
        });
        // Start:: Set Data
        this.data.goalAr = res.data.data[0].value.goals.description.ar;
        this.data.goalEn = res.data.data[0].value.goals.description.en;
        this.data.visionAr = res.data.data[0].value.vision.description.ar;
        this.data.visionEn = res.data.data[0].value.vision.description.en;
        this.data.missionAr = res.data.data[0].value.mission.description.ar;
        this.data.missionEn = res.data.data[0].value.mission.description.en;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.goalAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.goalEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      }
       if (!this.data.visionAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.visionEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
       }
       if (!this.data.missionAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.missionEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("key", "vision");
      REQUEST_DATA.append("value[goals][description][ar]", this.data.goalAr);
      REQUEST_DATA.append("value[goals][description][en]", this.data.goalEn);
       REQUEST_DATA.append("value[vision][description][ar]", this.data.visionAr);
      REQUEST_DATA.append("value[vision][description][en]", this.data.visionEn);
       REQUEST_DATA.append("value[mission][description][ar]", this.data.missionAr);
      REQUEST_DATA.append("value[mission][description][en]", this.data.missionEn);
      // REQUEST_DATA.append("_method", "PUT");

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
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    // End:: Fire Methods
  },
};
</script>
