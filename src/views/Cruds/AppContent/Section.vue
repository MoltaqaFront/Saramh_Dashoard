<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.AppContent.section") }}</h4>
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
          <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.titleAr')" v-model.trim="data.nameAr"
            @input="validateInput" required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Notifications.titleEn')" v-model.trim="data.nameEn"
            @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />

          
            <!-- Start:: Name Input -->
            <base-input col="6" type="textarea" :placeholder="$t('TABLES.Notifications.contentAr')" v-model.trim="data.contentAr"
              @input="validateInput" required />
            <!-- End:: Name Input -->

            <!-- Start:: Name Input -->
            <base-input col="6" type="textarea" :placeholder="$t('TABLES.Notifications.contentEn')" v-model.trim="data.contentEn"
              @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />

           
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
        contentEn: null,
        contentAr : null,
      },
      // End:: Data Collection To Send

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
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
    // Start:: Get Data To Edit
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `settings?key=content`,
        });
        // Start:: Set Data
        this.data.nameAr = res.data.data[0].value.title_ar;
        this.data.nameEn = res.data.data[0].value.title_en;
        this.data.contentAr = res.data.data[0].value.description_ar;
        this.data.contentEn = res.data.data[0].value.description_en;
        this.data.image.path = res.data.data[0].image;
        // End:: Set Data
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Edit

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.nameAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.nameEn) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentEn"));
        return;
      }
       if (!this.data.contentAr) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.contentAr"));
        return;
      }
      else if (!this.data.contentEn) {
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
  selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    // Start:: Submit Form
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      //  if (this.data.image.file != null) {
      // }
      REQUEST_DATA.append("key", "content");
      REQUEST_DATA.append("value[title][ar]", this.data.nameAr);
      REQUEST_DATA.append("value[title][en]", this.data.nameEn);
      REQUEST_DATA.append("value[description][ar]", this.data.contentAr);
      REQUEST_DATA.append("value[description][en]", this.data.contentEn);
      REQUEST_DATA.append("image", this.data.image.file);
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