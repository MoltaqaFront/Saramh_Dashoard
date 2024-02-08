<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.Coaches.add") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="admin_image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            @selectImage="selectImage" required />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameAr')" v-model.trim="data.nameAr" @input="validateInput" required />
          <!-- End:: Name Input -->

           <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.nameEn')" v-model.trim="data.nameEn"  @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />
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
            <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.noteAr')" v-model.trim="data.noteAr" @input="validateInput" required />
            <!-- End:: Name Input -->

            <!-- Start:: Name Input -->
              <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.noteEn')" v-model.trim="data.noteEn"  @input="removeArabicCharacters" @copy="onCopy" @paste="onPaste" required />
              <!-- End:: Name Input -->

          <!-- Start:: main Input -->
          <base-select-input col="6" :optionsList="Mainspescial" :placeholder="$t('TABLES.coaches.main')"
              v-model="data.main" />
          <!-- End:: main Input -->

          <!-- Start:: sub Input -->
            <base-select-input  col="6" :optionsList="Subspecail" :placeholder="$t('TABLES.coaches.sub')"
              v-model="data.sub" required />
            <!-- End:: sub Input -->

            <!-- Start experiences Input -->
            <base-input col="6" type="number" :placeholder="$t('TABLES.coaches.experience')" v-model.trim="data.experience" required />
            <!-- End experience Input -->

             <!-- Start:: Status Input -->
            <base-select-input col="6" :optionsList="activeStatuses" :placeholder="$t('PLACEHOLDERS.status')"
              v-model="data.is_status" />
            <!-- End:: Status Input -->

            <!-- Start:: Status Input -->
            <base-select-input col="6" :optionsList="is_show" :placeholder="$t('TABLES.coaches.isAvailable')"
              v-model="data.is_available" />
            <!-- End:: Status Input -->

           <!-- Start program -->
            <div class="title_text_wrapper mt-10">
              <h5 style="color: #57009B;">{{ $t("SIDENAV.Coaches.program") }}</h5>
            </div>

             <!-- Start:: program_name Input -->
            <base-input col="6" type="text" :placeholder="$t('SIDENAV.Coaches.program_name')" v-model.trim="data.program_name" required />
            <!-- End:: program_name Input -->
            
            <!-- Start:: description Input -->
              <base-input col="6" type="text" :placeholder="$t('SIDENAV.Coaches.description')" v-model.trim="data.description" required />
              <!-- End:: description Input -->
            
              <!-- Start:: price_sub Input -->
              <base-input col="6" type="number" :placeholder="$t('SIDENAV.Coaches.price_sub')" v-model.trim="data.price_sub" required />
              <!-- End:: price_sub Input -->
              <div class=" mt-20">
                <span class="add_another mt-10"  @click="addRow(index)">
                  <i class="fas fa-plus"></i>
                </span>
              </div>
               <div class="row align-items-center" v-for="(item, index) in field_values" :key="'o' + index">

                <div class="col-lg-6 col-6">
                  <!-- Start:: program_name Input -->
                  <base-input col="12" type="text" :placeholder="$t('SIDENAV.Coaches.program_name')" v-model.trim="item.program_name2" required />
                  <!-- End:: program_name Input -->
                </div>
                <div class="col-lg-6 col-6">
                  <!-- Start:: description Input -->
                  <base-input col="12" type="text" :placeholder="$t('SIDENAV.Coaches.description')" v-model.trim="item.description2" required />
                  <!-- End:: description Input -->
                </div>
                <div class="col-lg-6 col-6">
                  <!-- Start:: price_sub Input -->
                  <base-input col="12" type="number" :placeholder="$t('SIDENAV.Coaches.price_sub')" v-model.trim="data.price_sub2" required />
                  <!-- End:: price_sub Input -->
                </div>
                <div class="col-4">
                  <div class="all_actions">
                    <span class="add_another" @click="removeRow(index)">
                      <i class="fas fa-minus"></i>
                    </span>

                  </div>
                </div>

              </div>
          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CreateAdmin",

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
        program_name: null,
        description: null,
        price_sub: null,
        active: null
      },
      Mainspescial: [],
      Subspecail: [],
      field_values: [
        {
          program_name2: "",
          description2: "",
          price_sub2: ""
        },
      ],

      arabicRegex: /^[\u0600-\u06FF\s]+$/,
      EnRegex: /[\u0600-\u06FF]/,
      // End:: Data Collection To Send
    };
  },

  computed: {
    // Start:: Vuex Getters
    ...mapGetters({
      allRoles: "ApiGetsModule/allRoles",
    }),
    // End:: Vuex Getters
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
    // Start:: Vuex Actions
    ...mapActions({
      getRoles: "ApiGetsModule/getRoles",
    }),
    // End:: Vuex Actions
    onCopy(event) {
      event.preventDefault();
    },
    onPaste(event) {
      event.preventDefault();
    },

    addRow() {
      this.field_values.push(
        {
          program_name2: "",
          description2: "",
          price_sub2: ""
        }
      )
    },

    removeRow(index) {
      this.field_values.splice(index, 1)
    },
    
    validateInput() {
      // Remove non-Arabic characters from the input
      this.data.nameAr = this.data.nameAr.replace(/[^\u0600-\u06FF\s]/g, "");
      this.data.noteAr = this.data.noteAr.replace(/[^\u0600-\u06FF\s]/g, "");
    },
    removeArabicCharacters() {
      this.data.nameEn = this.data.nameEn.replace(this.EnRegex, "");
      this.data.noteEn = this.data.noteEn.replace(this.EnRegex, "");
    },
    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = emailRegex.test(this.data.email);
      if (!this.data.name) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.name"));
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email"));
        return;
      } else if (!this.data.phone) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.mobileNumber"));
        return;
      } else if (!this.data.role) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.role"));
        return;
      } else if (!this.data.password) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (this.data.password.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (!this.data.passwordConfirmation) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.password"));
        return;
      } else if (!this.isValidEmail) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.email_domain"));
        return;
      }
      else if (this.data.passwordConfirmation.length < 6) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.passwordLength"));
        return;
      } else if (
        this.data.password !=
        this.data.passwordConfirmation
      ) {
        this.isWaitingRequest = false;
        this.$message.error(this.$t("VALIDATION.notEqualPasswords"));
        return;
      } else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    // Start:: Submit Form
    async submitForm() {
      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data
      REQUEST_DATA.append("image", this.data.image.file);
      REQUEST_DATA.append("name[ar]", this.data.nameAr);
      REQUEST_DATA.append("name[en]", this.data.nameEn);
      REQUEST_DATA.append("mobile", this.data.phone);
      REQUEST_DATA.append("whatsapp", this.data.mobile);
      REQUEST_DATA.append("description[ar]", this.data.noteAr);
      REQUEST_DATA.append("description[en]", this.data.noteEn);
      REQUEST_DATA.append("specialty_id", this.data.main);
      REQUEST_DATA.append("subspecialty_id", this.data.sub);
      REQUEST_DATA.append("experience", this.data.experience);
      REQUEST_DATA.append("is_active", this.data.is_status);
      REQUEST_DATA.append("available", this.data.is_available);
      // REQUEST_DATA.append("")
      REQUEST_DATA.append("password_confirmation", this.data.passwordConfirmation);
      REQUEST_DATA.append("is_active", +this.data.active);
      // Start:: Append Request Data

      try {
        await this.$axios({
          method: "POST",
          url: `users`,
          data: REQUEST_DATA,
        });
        this.isWaitingRequest = false;
        this.$message.success(this.$t("MESSAGES.addedSuccessfully"));
        this.$router.push({ path: "/admins/all" });
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
          url: `specialties`,
          params: {
            "status": 1
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
          url: `subspecialties`,
          params: {
            "status": 1
          }
        });
        // console.log("Cities =>", res.data.data);
        this.Subspecail = res.data.data;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },

  async created() {
    // Start:: Fire Methods
    this.getMain();
    this.getSub();
    // End:: Fire Methods
    this.$nextTick(() => {
      this.data.phone = '';
    });
  },
};
</script>
<style lang="scss" scoped>
.all_action {
  display: flex;
  gap: 15px ;
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