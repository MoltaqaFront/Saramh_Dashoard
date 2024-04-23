<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.Coaches.show") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
            :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" disabled />
          <!-- End:: Image Upload Input -->

           <!-- Start:: Name Input -->
              <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameAr')" v-model.trim="data.nameAr" @input="validateInput" disabled />
              <!-- End:: Name Input -->

               <!-- Start:: Name Input -->
                <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameEn')" v-model.trim="data.nameEn"  @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" disabled />
                <!-- End:: Name Input -->
               <!-- Start:: Phone Input -->
              <base-input ref="phoneInput" col="6" type="tel" :placeholder="$t('TABLES.coaches.phone')"
                v-model.trim="data.phone" disabled autocomplete="new-password" />
              <!-- End:: Phone Input -->

              <!-- Start:: whatsapp Input -->
                <base-input ref="phoneInput" col="6" type="tel" :placeholder="$t('TABLES.coaches.moblie')"
                  v-model.trim="data.mobile" disabled autocomplete="new-password" />
                <!-- End:: whatsapp Input -->

                <!-- Start:: Name Input -->
                <base-input col="6" type="textarea" :placeholder="$t('TABLES.coaches.noteAr')" v-model.trim="data.noteAr" @input="validateInput" disabled />
                <!-- End:: Name Input -->

                <!-- Start:: Name Input -->
                  <base-input col="6" type="textarea" :placeholder="$t('TABLES.coaches.noteEn')" v-model.trim="data.noteEn"  @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" disabled />
                  <!-- End:: Name Input -->

                  <!-- Start:: main Input -->
                  <base-select-input col="6" :optionsList="Mainspescial"  :placeholder="$t('TABLES.coaches.main')"
                      v-model="data.main" disabled />
                  <!-- End:: main Input -->

                  <!-- Start:: sub Input -->
                    <base-select-input  col="6" :optionsList="Subspecail" :placeholder="$t('TABLES.coaches.sub')"
                      v-model="data.sub" disabled />
                    <!-- End:: sub Input -->

                     <!-- Start experiences Input -->
                    <base-input col="6" type="number" :placeholder="$t('TABLES.coaches.experience')" v-model.trim="data.experience" disabled />
                    <!-- End experience Input -->

                    <div class="title_text_wrapper mt-10">
                      <h5 style="color: #57009B;">{{ $t("SIDENAV.Coaches.program") }}</h5>
                    </div>
                    <div>
                      <div class="row align-items-center" v-for="(item, index) in field_values" :key="'o' + index">
              
                              <div class="col-lg-6 col-12">
                                  <base-input 
                                    col="12" 
                                    type="text" 
                                    :placeholder="$t('SIDENAV.Coaches.program_nameAr')" 
                                    v-model.trim="item.program_nameAr"
                                    @input="validateInput" 
                                    disabled />
                              </div>
                              <div class="col-lg-6 col-12">
                                <base-input 
                                  col="12" 
                                  type="text" 
                                  :placeholder="$t('SIDENAV.Coaches.program_nameEn')" 
                                  v-model.trim="item.program_nameEn"
                                  input="removeArabicCharacters"
                                  @copy="onCopy" 
                                  @paste="onPaste" 
                                  disabled />
                              </div>

                              <div class="col-lg-6 col-12">
                                    <base-input 
                                      col="12" 
                                      type="textarea" 
                                      :placeholder="$t('SIDENAV.Coaches.descriptionAr')" 
                                      v-model.trim="item.descriptionAr"
                                      @input="validateInput" 
                                      disabled />
                                </div>
                                <div class="col-lg-6 col-12">
                                  <base-input 
                                    col="12" 
                                    type="textarea" 
                                    :placeholder="$t('SIDENAV.Coaches.descriptionEn')" 
                                    v-model.trim="item.descriptionEn"
                                    input="removeArabicCharacters"
                                    @copy="onCopy" 
                                    @paste="onPaste" 
                                    disabled />
                                </div>

                              <div class="col-lg-6 col-12">
                                <base-input col="12" type="number" :placeholder="$t('SIDENAV.Coaches.price_sub')" v-model.trim="item.price_sub" disabled />
                              </div>

                              <!-- Start:: Deactivate Switch Input -->
                            <div class="input_wrapper switch_wrapper col-lg-6 col-12  my-5">
                              <v-switch color="green" :label="item.active_pro ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
                                v-model="item.active_pro" hide-details></v-switch>
                            </div>
              <!-- End:: Deactivate Switch Input -->


                      </div>
                    </div>


              <!-- Start:: Status Input -->
                <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
                  v-model="data.is_status" disabled />
                <!-- End:: Status Input -->

                <!-- Start:: Status Input -->
                <base-select-input col="6" :optionsList="is_show" :placeholder="$t('TABLES.coaches.isAvailable')"
                  v-model="data.is_available" disabled />
                <!-- End:: Status Input -->
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
          active_pro: ""
        },
      ],
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

    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
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

    removeRow(index) {
      this.field_values.splice(index, 1)
    },

    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
      this.data.des_ar = this.data.des_ar.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
      this.data.des_en = this.data.des_en.replace(this.EnRegex, "");
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