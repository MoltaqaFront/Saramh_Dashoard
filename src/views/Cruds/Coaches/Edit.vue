<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.Coaches.edit") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
         <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
              :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" required />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameAr')" v-model.trim="data.nameAr"
             required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameEn')" v-model.trim="data.nameEn"
            required />
          <!-- End:: Name Input -->
          <!-- Start:: Phone Input -->
          <base-input ref="phoneInput" col="6" type="tel" :placeholder="$t('TABLES.coaches.phone')"
            v-model.trim="data.phone" required autocomplete="new-password" />
          <!-- End:: Phone Input -->

          <!-- Start:: whatsapp Input -->
          <base-input ref="phoneInput" col="6" type="tel" :placeholder="$t('TABLES.coaches.moblie')"
            v-model.trim="data.mobile" required autocomplete="new-password" />
          <!-- End:: whatsapp Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="textarea" :placeholder="$t('TABLES.coaches.noteAr')" v-model.trim="data.noteAr"
            required />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="textarea" :placeholder="$t('TABLES.coaches.noteEn')" v-model.trim="data.noteEn"
             required />
          <!-- End:: Name Input -->

         <!-- Start:: main Input -->
                <base-select-input col="6" :optionsList="Mainspescial"  :placeholder="$t('TABLES.coaches.main')"
                    v-model="data.main" @input="getSub" required/>
                <!-- End:: main Input -->

                <!-- Start:: sub Input -->
                  <base-select-input  col="6" v-if="Subspecail" :optionsList="Subspecail" :placeholder="$t('TABLES.coaches.sub')"
                    v-model="data.sub" required />
                  <!-- End:: sub Input -->


          <!-- Start experiences Input -->
          <base-input col="6" type="number" :placeholder="$t('TABLES.coaches.experience')" v-model.trim="data.experience"
            required />
          <!-- End experience Input -->

          <div class="title_text_wrapper mt-10">
            <h5 style="color: #57009B;">{{ $t("SIDENAV.Coaches.program") }}</h5>
          </div>
          <div>
            <span class="add_another" @click="addRow(index)">
              <i class="fas fa-plus"></i>
            </span>

            <div class="row align-items-center" v-for="(item, index) in field_values" :key="'o' + index">

              <!-- {{ item.program_id }} -->
              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('SIDENAV.Coaches.program_nameAr')"
                  v-model.trim="item.program_nameAr"  required />
              </div>
              <div class="col-lg-6 col-12">
                <base-input col="12" type="text" :placeholder="$t('SIDENAV.Coaches.program_nameEn')"
                  v-model.trim="item.program_nameEn" 
                  required />
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="textarea" :placeholder="$t('SIDENAV.Coaches.descriptionAr')"
                  v-model.trim="item.descriptionAr"  required />
              </div>
              <div class="col-lg-6 col-12">
                <base-input col="12" type="textarea" :placeholder="$t('SIDENAV.Coaches.descriptionEn')"
                  v-model.trim="item.descriptionEn" 
                  required />
              </div>

              <div class="col-lg-6 col-12">
                <base-input col="12" type="number" :placeholder="$t('SIDENAV.Coaches.price_sub')"
                  v-model.trim="item.price_sub" required />
              </div>

              <!-- Start:: Deactivate Switch Input -->
               <div class="input_wrapper switch_wrapper col-lg-6 col-12 my-5">
                  <v-switch color="green" :label="item.active_pro ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
                    v-model="item.active_pro" hide-details></v-switch>
                </div>
             
              <!-- End:: Deactivate Switch Input -->
              <div class="col-2">
                <div class="all_actions">
                  <span class="add_another" @click="removeRow(index , item)">
                    <i class="fas fa-minus"></i>
                  </span>

                </div>
              </div>

            </div>

          </div>

          <!-- Start:: Status Input -->
          <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
            v-model="data.is_status" required />
          <!-- End:: Status Input -->

          <!-- Start:: Status Input -->
          <base-select-input col="6" :optionsList="is_show" :placeholder="$t('TABLES.coaches.isAvailable')"
            v-model="data.is_available" required />
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
        phone: null,
        mobile: null,
        noteAr: null,
        noteEn: null,
        main: null,
        sub: null,
        experience: null,
        is_status: null,
        is_available: null,
        active: null
      },
      Mainspescial: [],
      Subspecail: [],

      field_values: [
        {
          program_nameAr: "",
          program_nameEn: "",
          descriptionAr: "",
          descriptionEn: "",
          price_sub: "",
          active_pro: "",
          program_id: ""
        },
      ],
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

  methods: {
    disabledDate(current) {
      return current && current < moment().startOf("day");
    },

    addRow() {
      this.field_values.push(
        {
          program_nameAr: "",
          program_nameEn: "",
          descriptionAr: "",
          descriptionEn: "",
          price_sub: "",
          active_pro: ""
        }
      )
    },

  async  removeRow(index , item) {
      this.field_values.splice(index, 1)
       try {
        await this.$axios({
          method: "DELETE",
          url: `programs/${item.program_id}`,
        });
        this.$message.success(this.$t("MESSAGES.deletedSuccessfully"));
      } catch (error) {
        this.dialogDelete = false;
        this.$message.error(error.response.data.message);
      }
    },

    selectImage(selectedImage) {
      this.data.image = selectedImage;
    },
    async getDataToEdit() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `coaches/${this.$route.params.id}`,
        });

        // const data = res.data.data.GoldenOffer;
        this.data.image.path = res.data.data.Coach.image;
        this.data.nameAr = res.data.data.Coach.name_ar;
        this.data.nameEn = res.data.data.Coach.name_en;
        this.data.phone = res.data.data.Coach.mobile;
        this.data.mobile = res.data.data.Coach.whatsapp;
        this.data.noteAr = res.data.data.Coach.description_ar;
        this.data.noteEn = res.data.data.Coach.description_en;
        this.data.main = res.data.data.Coach.specialty;
        this.data.sub = res.data.data.Coach.subspecialty;
        this.data.experience = res.data.data.Coach.experience;
        this.data.is_status = res.data.data.Coach.is_active;
        this.data.is_available = res.data.data.Coach.available;

        // Populate the field_values array
        this.field_values = res.data.data.Coach.programs.map((item) => ({
          program_id: item.id,
          program_nameAr: item.name_ar,
          program_nameEn: item.name_en,
          descriptionAr: item.description_ar,
          descriptionEn: item.description_en,
          price_sub: item.price.toString(),
          active_pro: +item.is_active
        }));

        if (!this.data.is_status) {
          this.data.is_status =
          {
            id: 0,
            name: this.$t("STATUS.notActive"),
            value: 0,
          }
        } else {
          this.data.is_status =
          {
            id: 1,
            name: this.$t("STATUS.active"),
            value: 1,
          }
        }
        if (!this.data.is_available) {
          this.data.is_available =
          {
            id: 0,
            name: this.$t("BUTTONS.disavailable"),
            value: 0,
          }
        } else {
          this.data.is_available =
          {
            id: 1,
            name: this.$t("BUTTONS.available"),
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
      if (this.data.image.file != null) {
        REQUEST_DATA.append("image", this.data.image.file);
      }
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("mobile", this.data.phone);
      REQUEST_DATA.append("whatsapp", this.data.mobile);
      REQUEST_DATA.append("description[ar]", this.data.noteAr);
      REQUEST_DATA.append("description[en]", this.data.noteEn);
      REQUEST_DATA.append("specialty_id", this.data.main.id);
      REQUEST_DATA.append("subspecialty_id", this.data.sub.id);
      REQUEST_DATA.append("experience", this.data.experience);
      REQUEST_DATA.append("is_active", this.data.is_status.id);
      REQUEST_DATA.append("available", this.data.is_available.id);
      if (this.field_values) {
        this.field_values.forEach((element, index) => {
          if (element.program_id) {
            REQUEST_DATA.append(`programs[${index}][id]`, element.program_id);
          }
          if (element.program_nameAr) {
            REQUEST_DATA.append(`programs[${index}][name][ar]`, element.program_nameAr);
          }
          if (element.program_nameEn) {
            REQUEST_DATA.append(`programs[${index}][name][en]`, element.program_nameEn);
          }
          if (element.descriptionAr) {
            REQUEST_DATA.append(`programs[${index}][description][ar]`, element.descriptionAr);
          }
          if (element.descriptionEn) {
            REQUEST_DATA.append(`programs[${index}][description][en]`, element.descriptionEn);
          }
          if (element.price_sub) {
            REQUEST_DATA.append(`programs[${index}][price]`, element.price_sub);
          }
          REQUEST_DATA.append(`programs[${index}][is_active]`, +element.active_pro);      
        });
      }
      REQUEST_DATA.append("_method", "PUT")
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `coaches/${this.$route.params.id}`,
          data: REQUEST_DATA,

        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.editedSuccessfully"));
        this.$router.push({ path: "/Coaches/all" });
      } catch (error) {
        this.isWaitingRequest = false;
        this.$message.error(error.response.data.message);
      }
    },
    // End:: Submit Form

    async getMain() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `get-all-specialties`,
          params: {
            "is_active": 1
          }
        });
        // console.log("Cities =>", res.data.data);
        this.Mainspescial = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    async getSub() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `get-all-sub-specialties`,
          params: {
            "is_active": 1 ,
           specialty_id: `${this.data.main?.id}`,
          }
        });
        // console.log("Cities =>", res.data.data);
        this.Subspecail = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  created() {
    // Start:: Fire Methods
    this.getDataToEdit();
    this.getMain();
    this.getSub();
    // End:: Fire Methods
    this.$nextTick(() => {
      this.data.phone = '';
    });
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