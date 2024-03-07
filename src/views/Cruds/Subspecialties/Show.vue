<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.Subspecialties.show") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Subspecialties.nameAr')"
            v-model.trim="data.nameAr" disabled />
          <!-- End:: Name Input -->

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Subspecialties.nameEn')"
            v-model.trim="data.nameEn" disabled />
          <!-- End:: Name Input -->

          
            <!-- Start:: Name Input -->
            <base-input col="6" type="text" :placeholder="$t('TABLES.MainSpecializations.name')"
              v-model.trim="data.name" disabled />
            <!-- End:: Name Input -->

          <!-- Start:: Deactivate Switch Input -->
          <div class="input_wrapper switch_wrapper my-5">
            <v-switch color="green" :label="data.active ? $t('PLACEHOLDERS.active') : $t('PLACEHOLDERS.notActive')"
              v-model="data.active" hide-details disabled></v-switch>
          </div>
          <!-- End:: Deactivate Switch Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>

export default {
  name: "ShowSubspecialties",

  data() {
    return {
      // Start:: Loader Control Data
      isWaitingRequest: false,
      // End:: Loader Control Data

      // Start:: Data Collection To Send
      data: {
        nameAr: null,
        nameEn: null,
        name: null,
        active: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {
  },

  methods: {
    // start show data
    async showData() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `subspecialties/${this.$route.params.id}`,
        });
        this.data.nameAr = res.data.data.Subspecialty.name_ar;
        this.data.nameEn = res.data.data.Subspecialty.name_en;
        this.data.name = res.data.data.Subspecialty.specialty.name
        this.data.active = res.data.data.Subspecialty.is_active;
      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data


  },

  created() {
    // Start:: Fire Methods
    this.showData();
    // End:: Fire Methods
  },
};
</script>
