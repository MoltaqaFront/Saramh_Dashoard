<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.advertisement.edit") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
       <form @submit.prevent="validateFormInputs">
          <div class="row">
            <!-- Start:: Image Upload Input -->
            <base-image-upload-input 
              col="12" 
              identifier="admin_image" 
              :preSelectedImage="data.image.path"
              :placeholder="$t('PLACEHOLDERS.image')"
              @selectImage="selectImage" required />
            <!-- End:: Image Upload Input -->

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameAr')" v-model.trim="data.nameAr"
             required />
            <!-- End:: Name Input -->

            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('PLACEHOLDERS.nameEn')" v-model.trim="data.nameEn"
               required />

            <!-- End:: Name Input -->
             <base-input 
                col="6" 
                type="date" 
                :placeholder="$t('SIDENAV.advertisement.Start_publich')"
                v-model.trim="data.startDate"
                required/>

                 <base-input 
                  col="6" 
                  type="date" 
                  :placeholder="$t('SIDENAV.advertisement.End_publich')"
                  v-model.trim="data.endtDate"
                  required/>

              <!-- Start:: Status Input -->
                <base-select-input 
                  col="6" 
                  :optionsList="activeStatuses" 
                  :placeholder="$t('PLACEHOLDERS.status')"
                 v-model ="data.is_active" required/>
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
  name: "CreateAdditionalFields",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        image: {
          path: null,
          file: null,
        },
        nameAr: null,
        nameEn: null,
        startDate: null,
        endtDate: null,
        is_active: null
      },
      // End:: Data Collection To Send

    };
  },

  computed: {

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

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },

    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `advertisements/${this.$route.params.id}`,
        });

        // const data = res.data.data.GoldenOffer;
        this.data.nameAr = res.data.data.Advertisement.name_ar;
        this.data.nameEn = res.data.data.Advertisement.name_en;
        this.data.image.path = res.data.data.Advertisement.advertisement;
        this.data.startDate = res.data.data.Advertisement.start_at.split(" ")[0];
        this.data.endtDate = res.data.data.Advertisement.end_at.split(" ")[0];
        this.data.is_active = res.data.data.Advertisement.is_active;
        if (!this.data.is_active) {
          this.data.is_active =
          {
            id: 0,
            name: this.$t("STATUS.notActive"),
            value: 0,
          }
        } else {
          this.data.is_active =
          {
            id: 1,
            name: this.$t("STATUS.active"),
            value: 1,
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
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
      // Start:: Append Request Data
      REQUEST_DATA.append("advertisement", this.data.image.file);
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("start_at", this.data.startDate);
      REQUEST_DATA.append("end_at", this.data.endtDate);
      REQUEST_DATA.append("is_active", this.data.is_active?.value);
      REQUEST_DATA.append("type", "image")
      REQUEST_DATA.append("_method", "PUT")
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `advertisements/${this.$route.params.id}`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/advertisements/all" });
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