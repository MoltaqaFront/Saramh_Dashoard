<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.Subspecialties.edit") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr"
            required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn"
             required />

          <!-- End:: Name Input -->

           <base-select-input col="6" :optionsList="spectial" :placeholder="$t('TABLES.MainSpecializations.name')"
              v-model="data.id" />


          <!-- Start:: Status Input -->
          <base-select-input col="6" :optionsList="is_show" :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.status" />
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
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "EditSubspecialties",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        id:null,
        active: true,
        status: null,
      },
      allVehicleTypes: [],
      spectial : [],
      // End:: Data Collection To Send
    };
  },

  computed: {
    is_show() {
      return [
        {
          id: 1,
          name: this.$t("PLACEHOLDERS.active"),
          value: true,
        },
        {
          id: 0,
          name: this.$t("PLACEHOLDERS.notActive"),
          value: false,
        }
      ];
    },


  },

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameAr"));
        return;
      } else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.nameEn"));
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
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("specialty_id", this.data.id?.id)
      REQUEST_DATA.append("is_active", +this.data.status?.value);
      REQUEST_DATA.append("_method", "PUT");

      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `subspecialties/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/Subspecialties/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `subspecialties/${this.$route.params.id}`,
        });
         this.data.nameAr = res.data.data.Subspecialty.name_ar;
        this.data.nameEn = res.data.data.Subspecialty.name_en;
        this.data.id = res.data.data.Subspecialty.specialty
        this.data.status = res.data.data.Subspecialty.is_active;
        if (!this.data.status) {
          this.data.status =
          {
            id: 0,
            name: this.$t("PLACEHOLDERS.notActive"),
            value: 0,
          }
        } else {
          this.data.status =
          {
            id: 1,
            name: this.$t("PLACEHOLDERS.active"),
            value: 1,
          }
        }
        // this.data.active = res.data.data.additionalField.is_active;
        // console.log(res.data.body.add_space)
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end all ads data
     async getRegions() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `specialties`,
          params: {
            "is_active": 1
          }
        });
        // console.log("Cities =>", res.data.data);
        this.spectial = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    //this.showVehicleTypes()
    this.getRegions();
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

  .fa-trash {
    color: #ff2159;
    cursor: pointer
  }
}
</style>