<template>
  <div class="crud_form_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("SIDENAV.SubscriptionsPrice.show") }}</h4>
    </div>
    <!-- End:: Title -->

    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <form @submit.prevent="validateFormInputs">
        <div class="row">
           <!-- Start:: Name Input -->
              <base-input col="6" type="number" :placeholder="$t('TABLES.subscriptions.number')" v-model.trim="data.number"  disabled />
              <!-- End:: Name Input -->

               <!-- Start:: Name Input -->
                <base-input col="6" type="date" :placeholder="$t('TABLES.subscriptions.date')" v-model.trim="data.date"  disabled />
                <!-- End:: Name Input -->
                <!-- Start:: Name Input -->
              <base-input col="6" type="text" :placeholder="$t('TABLES.subscriptions.nameclient')" v-model.trim="data.name" disabled />
              <!-- End:: Name Input -->

              <!-- Start:: Phone Input -->
              <base-input col="6" type="tel" :placeholder="$t('TABLES.subscriptions.phone')" v-model.trim="data.phone" disabled />
              <!-- End:: Phone Input -->
              
                <!-- Start:: Phone Input -->
              <base-input col="6" type="text" :placeholder="$t('TABLES.subscriptions.coach')" v-model.trim="data.coach" disabled />
              <!-- End:: Phone Input -->

              <!-- Start:: Image Upload Input -->
                <base-image-upload-input col="12" identifier="admin_image" :preSelectedImage="data.image.path"
                  :placeholder="$t('PLACEHOLDERS.image')" @selectImage="selectImage" disabled />
                <!-- End:: Image Upload Input -->

             <!-- Start:: Phone Input -->
              <base-input col="6" type="tel" :placeholder="$t('TABLES.subscriptions.coachNumber')" v-model.trim="data.coachNumber" disabled />
              <!-- End:: Phone Input -->

              <!-- Start:: whatsapp Input -->
              <base-input col="6" type="tel" :placeholder="$t('TABLES.subscriptions.WhatsApp')" v-model.trim="data.WhatsApp" disabled />
                <!-- End:: whatsapp Input -->

                  <!-- Start:: main Input -->
                  <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.main')" v-model.trim="data.main" disabled />
                  <!-- End:: main Input -->

                  <!-- Start:: sub Input -->
                  <base-input col="6" type="text" :placeholder="$t('TABLES.coaches.sub')" v-model.trim="data.sub" disabled />
                    <!-- End:: sub Input -->

                     <!-- Start experiences Input -->
                    <base-input col="6" type="text" :placeholder="$t('TABLES.subscriptions.program')" v-model.trim="data.program" disabled />
                    <!-- End experience Input -->

                    <div class="title_text_wrapper mt-10">
                      <h5 style="color: #57009B;">{{ $t("TABLES.subscriptions.dataPrice") }}</h5>
                    </div>
                    <base-input 
                      col="6" 
                      type="number" 
                      :placeholder="$t('TABLES.subscriptions.programPrice')" 
                      v-model.trim="data.programPrice"
                    disabled />
                     <base-input 
                      col="6" 
                      type="number" 
                      :placeholder="$t('TABLES.subscriptions.AddedTax')" 
                      v-model.trim="data.AddedTax"
                      disabled />
                     <base-input 
                        col="6" 
                        type="number" 
                        :placeholder="$t('TABLES.subscriptions.totalPriceOrder')" 
                        v-model.trim="data.totalPriceOrder"
                        disabled />
                      <base-input 
                        col="6" 
                        type="number" 
                        :placeholder="$t('TABLES.subscriptions.vatApp')" 
                        v-model.trim="data.vatApp"
                        disabled />
                      <base-input 
                        col="6" 
                        type="number" 
                        :placeholder="$t('TABLES.subscriptions.priceCoach')" 
                        v-model.trim="data.priceCoach" 
                        disabled />
                      <div v-if="data.rate" class="row" >
                        <div class="title_text_wrapper mt-10">
                          <h5 style="color: #57009B;">{{ $t("TABLES.subscriptions.rateCoach") }}</h5>
                        </div>
                      <!-- Start:: Rate Input -->
                      <base-rate-input  col="6" :placeholder="$t('PLACEHOLDERS.rating_stars')" v-model-trim="data.rate"
                        size="22" disabled />
                      <!-- End:: Rate Input -->
                       <base-input 
                        col="6" 
                        type="textarea" 
                        :placeholder="$t('TABLES.ContactMessages.replay')" 
                        v-model.trim="data.replay" 
                        disabled />
                      </div>
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
        number: null,
        date: null,
        name: null,
        phone: null,
        coach: null,
        coachNumber: null,
        WhatsApp: null,
        main: null,
        sub: null,
        program: null,
        programPrice: null,
        AddedTax: null,
        totalPriceOrder: null,
        vatApp: null,
        priceCoach: null,
        rate: null,
        replay: null
      },
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
          url: `subscriptions/${this.$route.params.id}`,
        });

        this.data.image.path = res.data.data.Subscription.coach.image;
        this.data.number = res.data.data.Subscription.id;
        this.data.date = res.data.data.Subscription.created_at.split(" ")[0];
        this.data.name = res.data.data.Subscription.user.name;
        this.data.phone = res.data.data.Subscription.user.mobile;
        this.data.coach = res.data.data.Subscription.coach.name;
        this.data.coachNumber = res.data.data.Subscription.coach.mobile;
        this.data.WhatsApp = res.data.data.Subscription.coach.whatsapp;
        this.data.main = res.data.data.Subscription.coach.specialty.name;
        this.data.sub = res.data.data.Subscription.coach.subspecialty.name;
        this.data.program = res.data.data.Subscription.program.name;
        this.data.programPrice = res.data.data.Subscription.net_price;
        this.data.AddedTax = res.data.data.Subscription.tax;
        this.data.totalPriceOrder = res.data.data.Subscription.total;
        this.data.vatApp = res.data.data.Subscription.commission;
        this.data.priceCoach = res.data.data.Subscription.net_profit;
        if (res.data.data.Subscription.rate) {
          this.data.rate = res.data.data.Subscription.rate;
        }
        if (res.data.data.Subscription.replay) {
          this.data.replay = res.data.data.Subscription.replay;
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