<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TABLES.Rates.show") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">

           <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
            :placeholder="$t('TABLES.Rates.image')" @selectImage="selectImage" disabled />

          <!-- Start:: Name Input -->
          <base-input col="6" type="text" :placeholder="$t('TABLES.Rates.clientName')" v-model.trim="data.name" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.Rates.sendDate')" v-model.trim="data.created_at"
            disabled />
          <base-rate-input col="6" :placeholder="$t('TABLES.Rates.rate')" v-model="data.rate"
            size="22" disabled />
          <base-input col="6"  type="text" :placeholder="$t('TABLES.Rates.comment')"
            v-model.trim="data.comment" disabled />
          <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.name')" v-model.trim="data.Coach"  disabled />
          <base-input col="6" type="text" :placeholder="$t('SIDENAV.Coaches.programName')" v-model.trim="data.programName"  disabled />

            <base-input col="6" type="text" :placeholder="$t('TABLES.Rates.date')" v-model.trim="data.createdprogram"
            disabled />

          <!-- End:: Name Input -->

        </div>
      </form>
    </div>
    <!-- END:: Single Step Form Content -->
  </div>
</template>

<script>
import RatingPreview from "@/components/ui/RatingPreview.vue";

export default {
  name: "showCity",
   components: {
    RatingPreview,

  },
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
        name: null,
        rate: null,
        comment: null,
        Coach: null,
        programName: null,
        created_at: null,
        createdprogram: null
      },
      // End:: Data Collection To Send
    };
  },

  computed: {

  },

  methods: {
    // start show data
    async showRate() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `rates/${this.$route.params.id}`,
        });
        this.data.image.path = res.data.data.Rate.image;
        this.data.name = res.data.data.Rate.name;
        this.data.created_at = res.data.data.Rate.created_at;
        this.data.rate = res.data.data.Rate.stars;
        this.data.comment = res.data.data.Rate.comment;
        this.data.Coach = res.data.data.Rate.coach_name;
        this.data.programName = res.data.data.Rate.program_name;
        this.data.createdprogram = res.data.data.Rate.created_at;

      } catch (error) {
        this.loading = false;
        console.log(error.response.data.message);
      }
    },
    // end show data


  },

  created() {
    // Start:: Fire Methods
    this.showRate();
    // End:: Fire Methods
  },
};
</script>
