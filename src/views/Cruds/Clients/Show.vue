<template>
  <div class="crud_form_wrapper single_show_content_wrapper">
    <!-- Start:: Title -->
    <div class="form_title_wrapper">
      <h4>{{ $t("TITLES.showClient", { name: data.name }) }}</h4>
    </div>
    <!-- End:: Title -->


    <!-- Start:: Single Step Form Content -->
    <div class="single_step_form_content_wrapper">
      <!-- ==== Start:: Status Badges ==== -->
      <div class="badges_wrapper justify-content-between">
        <div class="wrapper">
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.numberOfVisits", { number: data.numberOfVisits }) }}
          </v-chip>
          <v-chip color="amber darken-2" text-color="white">
            {{ $t("TITLES.lastVisit", { date: data.lastVisit }) }}
          </v-chip>
        </div>

        <v-chip :color="data.active ? 'green' : 'red'" text-color="white">
          {{ data.active ? $t("STATUS.active") : $t("STATUS.notActive") }}
        </v-chip>
      </div>
      <!-- ==== End:: Status Badges ==== -->

      <!-- ==== Start:: Client Main Data ==== -->
      <form>
        <div class="row">
          <!-- Start:: Image Upload Input -->
          <base-image-upload-input col="12" identifier="client_image" :placeholder="$t('PLACEHOLDERS.personalImage')"
            :preSelectedImage="data.image" disabled class="disabled_input" />
          <!-- End:: Image Upload Input -->

          <!-- Start:: Ar Name Input -->
          <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.name')" v-model.trim="data.name" disabled
            class="disabled_input" />
          <!-- End:: Ar Name Input -->

          <!-- Start:: Phone Input -->
          <base-input col="3" type="tel" :placeholder="$t('TABLES.Clients.phone')" v-model.trim="data.phone" readonly
            class="disabled_input" />
          <!-- End:: Phone Input -->

          <!-- Start:: Email Input -->
          <base-input col="3" type="email" :placeholder="$t('TABLES.Clients.email')" v-model.trim="data.email" readonly
            class="disabled_input" />
          <!-- End:: Email Input -->

          <!-- Start:: age  Input -->
          <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.age')" v-model.trim="data.age"
            readonly class="disabled_input" />
          <!-- End:: age Input -->

           <!-- Start:: widght  Input -->
           <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.widght')" v-model.trim="data.weight"
            readonly class="disabled_input" />
          <!-- End:: widght  Input -->

           <!-- Start:: height Input -->
           <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.height')" v-model.trim="data.height"
            readonly class="disabled_input" />
          <!-- End:: height Input -->

           <!-- Start:: diseases Input -->
           <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.diseases')" v-model.trim="data.diseases"
            readonly class="disabled_input" />
          <!-- End:: diseases Input -->
          
          <!-- Start:: Joining Date Input -->
          <base-input col="3" type="text" :placeholder="$t('TABLES.Clients.joiningDate')" v-model.trim="data.joiningDate"
            readonly class="disabled_input" />
          <!-- End:: Joining Date Input -->

           <!-- Start:: surgeries Input -->
           <base-input col="4"  type="text" :placeholder="$t('TABLES.Clients.surgeries')" v-model.trim="data.surgeries"
            readonly class="disabled_input" />
          <!-- End:: surgeries  Input -->

           <!-- Start:: surgeries_what  Input -->
           <base-input col="4"  type="text" :placeholder="$t('TABLES.Clients.surgeries_what')" v-model.trim="data.surgeries_what"
            readonly class="disabled_input" />
          <!-- End:: surgeries_what  Input -->

           <!-- Start:: surgeries_when Input -->
           <base-input col="4"  type="text" :placeholder="$t('TABLES.Clients.surgeries_when')" v-model.trim="data.surgeries_when"
            readonly class="disabled_input" />
          <!-- End:: surgeries_when Input -->

           <!-- Start:: playing_sports Input -->
           <base-input col="6"  type="text" :placeholder="$t('TABLES.Clients.playing_sports')" v-model.trim="data.playing_sports"
            readonly class="disabled_input" />
          <!-- End:: playing_sports Input -->

          <!-- Start:: practice_duration Input -->
            <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.practice_duration')" v-model.trim="data.practice_duration"
            readonly class="disabled_input" />
          <!-- End:: practice_duration Input -->

           <!-- Start:: goal Input -->
           <base-input col="6" type="text" :placeholder="$t('TABLES.Clients.goal')" v-model.trim="data.goal"
            readonly class="disabled_input" />
          <!-- End:: goal  Input -->

           <!-- Start:: playing_days Input -->
           <base-input col="8" type="text" :placeholder="$t('TABLES.Clients.playing_days')" v-model.trim="data.playing_days"
            readonly class="disabled_input" />
          <!-- End:: playing_days Input -->

           <!-- Start:: playing_place Input -->
           <base-input col="8" type="text" :placeholder="$t('TABLES.Clients.playing_place')" v-model.trim="data.playing_place"
            readonly class="disabled_input" />
          <!-- End:: playing_place Input -->

        </div>
      </form>
      <!-- ==== End:: Client Main Data ==== -->
    </div>
    <!-- End:: Single Step Form Content -->
  </div>
</template>

<script>
export default {
  name: "SingleClient",

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      // Start:: Loading Data
      isWaitingRequest: false,
      // End:: Loading Data

      // Start:: Data
      data: {
        image: null,
        name: null,
        phone: null,
        registration_otp_status: null,
        secondPhone: null,
        email: null,
        age: null,
        weight: null,
        height : null,
        diseases: null,
        surgeries : null,
        playing_sports: null,
        playing_place : null,
        goal : null,
        tools : null,
        practice_duration : null,
        joiningDate: null,
        currentPackage: null,
        addresses: [],
        active: false,
      },
      // End:: Data
    };
  },

  methods: {
    // Start:: Get Data To Show
    async getDataToShow() {
      try {
        let res = await this.$axios({
          method: "GET",
          url: `clients/${this.$route.params.id}`,
        });
        // console.log("DATA =>", res.data.data);
        this.data.image = res.data.data.Client.image.path;
        this.data.name = res.data.data.Client.name;
        this.data.phone = res.data.data.Client.mobile;
        this.data.registration_otp_status = res.data.data.Client.is_verified;
        this.data.email = res.data.data.Client.email;
        this.data.joiningDate = res.data.data.Client.created_at;
        this.data.numberOfVisits = res.data.data.Client.login_count;
        this.data.lastVisit = res.data.data.Client.last_login;
        this.data.active = res.data.data.Client.is_active;
        this.data.age = res.data.data.Client.pesonalInfo.age;
        this.data.weight = res.data.data.Client.pesonalInfo.weight;
        this.data.height = res.data.data.Client.pesonalInfo.height;
        this.data.diseases = res.data.data.Client.pesonalInfo.diseases_bool ==1 ? "نعم" : "لا"
        this.data.surgeries = res.data.data.Client.pesonalInfo.surgeries_bool ==1 ? "نعم" : "لا";
        this.data.surgeries_what = res.data.data.Client.pesonalInfo.surgeries ;
        this.data.surgeries_when = res.data.data.Client.pesonalInfo.surgeries_date ;
        this.data.playing_sports = res.data.data.Client.pesonalInfo.playing_sports_bool ==1 ? "نعم" : "لا";
        this.data.playing_place = res.data.data.Client.pesonalInfo.playing_place;
        this.data.playing_days = res.data.data.Client.pesonalInfo.playing_days_count;
        this.data.goal = res.data.data.Client.pesonalInfo.goal;
        this.data.tools = res.data.data.Client.pesonalInfo.tools;
        this.data.practice_duration = res.data.data.Client.pesonalInfo.practice_duration;
        
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    // End:: Get Data To Show
  },

  created() {
    // Start:: Fire Methods
    this.getDataToShow();
    // End:: Fire Methods
  },
};
</script>
