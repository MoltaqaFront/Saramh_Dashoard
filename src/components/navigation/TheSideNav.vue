<template>
  <div class="side_nav_wrapper" :class="{ active: navIsActive }">
    <!-- Start:: Toggle Btn -->
    <button class="close_btn" @click="$emit('fireToggleNavDrawerEmit')">
      <i class="fal fa-times"></i>
    </button>
    <!-- End:: Toggle Btn -->

    <!-- Start:: Logo -->
    <div class="logo_wrapper">
      <router-link class="logo" to="/home">
        <img src="@/assets/media/logo/logo.png" alt="Logo" width="170" height="125" />
      </router-link>
    </div>
    <!-- End:: Logo -->

    <!-- Start:: Side Nav Links -->
    <div class="side_nav_links_wrapper">
      <!-- Start:: Home Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/home">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/home.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.dashboard") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Home Route -->

      <!-- Start:: notifications Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('notifications index', 'notifications')">
        <router-link to="/all-notifications/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/notifications.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.notifications.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: notifications Route -->

      <!-- Start:: clients Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('clients index', 'clients')">
        <router-link to="/clients/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/client.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Clients.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: clients Route -->

      <!-- Start:: Main specializations Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('specialties index', 'specialties')">
        <router-link to="/MainSpecializations/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/main.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.MainSpecializations.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Main specializations Route -->

      <!-- Start:: Subspecialties Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('subspecialties index', 'subspecialties')">
        <router-link to="/Subspecialties/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/subtrain.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Subspecialties.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Subspecialties Route -->

      <!-- Start:: Coaches Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('coaches index', 'coaches')">
        <router-link to="/Coaches/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/gym.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Coaches.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Coaches Route -->

      <!-- Start:: Certificates management -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('certificates index', 'certificates')">
        <router-link to="/Certificates/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/certificate.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Certificates.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Certificates management -->

      <!-- Start:: advertisements Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('advertisements index', 'advertisements')">
        <router-link to="/advertisements/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/ads.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("PLACEHOLDERS.ads_management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: advertisements Route -->

      <!-- Start:: contacts Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('contacts index', 'contacts')">
        <router-link to="/contact-messages/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/messages.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.ContactMessages.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: contacts Route -->

      <!-- Start:: questions Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('questions index', 'questions')">
        <router-link to="/questions/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/question.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.questions.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: questions Route -->

      <!-- Start:: rates Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('rates index', 'rates')">
        <router-link to="/rates/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/star.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("TABLES.Rates.rates") }}
          </span>
        </router-link>
      </div>
      <!-- End:: rates Route -->


      <!-- Start:: SubscriptionsPrice management -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')"
        v-if="$can('subscriptions index', 'subscriptions')">
        <router-link to="/SubscriptionsPrice/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/exchange.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.SubscriptionsPrice.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: SubscriptionsPrice management -->

      <!-- Start:: financialreports management -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')">
        <router-link to="/financial-reports/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/price.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.financialreports.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: financialreports management -->

      <!-- Start:: Side Nav Routes -->
      <div class="side_routes_wrapper" v-if="$can('settings create', 'settings')">
        <a-menu style="width: 100%" mode="vertical" :open-keys="openKeys" @openChange="onOpenChange">

          <a-sub-menu v-for="item in sideNavbarList" :key="item.key" :data-type="!item.children ? 'single_route' : ''">
            <template v-if="item.children">

              <span slot="title">
                <img :src="item.icon" alt="icon" width="35" height="35" />
                <span> {{ item.title }} </span>
              </span>

              <a-menu-item v-for="childItem in item.children" :key="childItem.hey">
                <button class="text-start w-100" @click="$emit('fireToggleNavDrawerEmit')">
                  <router-link :to="childItem.route">
                    <i class="fad fa-circle"></i>
                    {{ childItem.title }}
                  </router-link>
                </button>
              </a-menu-item>

            </template>

          </a-sub-menu>

        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->


      <!-- Start:: Admins Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('admins index', 'admins')">
        <router-link to="/admins/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/manager.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Admins.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: Admins Route -->

      <!-- Start:: roles Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('roles index', 'roles')">
        <router-link to="/roles/all">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/role.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.Roles.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: roles Route -->

      <!-- Start:: settings Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('settings create', 'settings')">
        <router-link to="/settings">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/settings.svg" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.settings.title") }}
          </span>
        </router-link>
      </div>
      <!-- End:: settings Route -->

      <!-- Start:: settings Route -->
      <div class="home_route" @click="$emit('fireToggleNavDrawerEmit')" v-if="$can('settings create', 'settings')">
        <router-link to="/management_settings">
          <span class="route_icon">
            <img src="@/assets/media/icons/ui_icons/subtrain.png" alt="icon" width="40" height="40" />
          </span>
          <span class="route_text">
            {{ $t("SIDENAV.AppContent.management") }}
          </span>
        </router-link>
      </div>
      <!-- End:: settings Route -->

      <div class="side_routes_wrapper">
        <a-menu style="width: 100%" mode="inline">
          <!-- Start:: Logout Tab -->
          <a-sub-menu key="logout" @titleClick="logoutConfirmationModalIsOpen = true">
            <!-- ========= Start:: Main Tab -->
            <span slot="title" class="logout_btn">
              <img src="../../assets/media/icons/ui_icons/logout.svg" alt="icon" width="35" height="35" />
              <span>
                {{ $t("SIDENAV.Logout.title") }}
              </span>
            </span>
            <!-- ========= End:: Main Tab -->
          </a-sub-menu>
          <!-- End:: Logout Tab -->
        </a-menu>
      </div>
      <!-- End:: Side Nav Routes -->

      <!-- Start:: Logout Confirmation Modal -->
      <v-dialog v-model="logoutConfirmationModalIsOpen">
        <v-card>
          <v-card-title class="text-h5 justify-center">
            {{ $t("TITLES.logoutConfirmingMessage") }}
          </v-card-title>
          <v-card-actions>
            <v-btn class="modal_confirm_btn" @click="logout">{{
              $t("BUTTONS.logout")
            }}</v-btn>

            <v-btn class="modal_cancel_btn" @click="logoutConfirmationModalIsOpen = false">{{ $t("BUTTONS.cancel")
            }}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End:: Logout Confirmation Modal -->
    </div>
    <!-- End:: Side Nav Links -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideNav",

  emits: ["fireToggleNavDrawerEmit"],

  props: {
    navIsActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    // Start:: Vuex Get Authenticated User Data
    ...mapGetters({
      getAuthenticatedUserData: "AuthenticationModule/getAuthenticatedUserData"
    }),
    // End:: Vuex Get Authenticated User Data

    // Start:: Extract Side Nav Keys
    extractSideNavItemsKeys() {
      let extractedKeys = [];
      this.sideNavbarList.forEach((element) => {
        extractedKeys.push(element["key"]);
      });
      return extractedKeys;
    },
    // End:: Extract Side Nav Keys

  },

  data() {
    return {
      // Start:: Controle Open Tabs Data
      openKeys: [],
      // End:: Controle Open Tabs Data

      // Start:: Side Navbar List
      sideNavbarList: [
        {
          key: "appContent",
          title: this.$t("SIDENAV.AppContent.title"),
          icon: require("@/assets/media/icons/ui_icons/book_mark.svg"),
          children: [
            {
              key: "termsAndConditions",
              title: this.$t("SIDENAV.AppContent.termsAndConditions"),
              route: "/app-content/terms",
              hasPermission: this.$can('settings create', 'settings'),
            },
            {
              key: "privacyPolicy",
              title: this.$t("SIDENAV.AppContent.privacyPolicy"),
              route: "/app-content/policy",
              hasPermission: this.$can('settings create', 'settings'),
            },
            {
              key: "Saramh-message",
              title: this.$t("SIDENAV.AppContent.message"),
              route: "/app-content/message",
              hasPermission: this.$can('settings create', 'settings'),
            },
            {
              key: "Saramh-section",
              title: this.$t("SIDENAV.AppContent.section"),
              route: "/app-content/section",
              hasPermission: this.$can('settings create', 'settings'),
            },
            {
              key: "contact",
              title: this.$t("PLACEHOLDERS.contact_admins"),
              route: "/contact_settings",
              hasPermission: this.$can('settings create', 'settings'),
            },
          ],
        },

      ],

      // Start:: Modal Controlling Data
      logoutConfirmationModalIsOpen: false,
      // End:: Modal Controlling Data
    };
  },

  methods: {
    // Start:: Vuex Auth Actions
    ...mapActions({
      logout: "AuthenticationModule/logout"
    }),
    // End:: Vuex Auth Actions

    // Start:: Controle Open Tabs
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.extractSideNavItemsKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // End:: Controle Open Tabs
  },

  created() {
  },
};
</script>
