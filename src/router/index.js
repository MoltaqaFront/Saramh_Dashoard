import AboutUs from "../views/Cruds/AppContent/AboutUs.vue";
import AdminsHome from "../views/Cruds/Admins/Home.vue";
import AdvertisementsHome from "../views/Cruds/Advertisements/Home.vue";
import AllAdmins from "../views/Cruds/Admins/ShowAll.vue";
import AllAdvertisements from "../views/Cruds/Advertisements/ShowAll.vue";
import AllCertificates from "../views/Cruds/Certificates/ShowAll.vue";
import AllClients from "../views/Cruds/Clients/ShowAll.vue";
import AllCoaches from "../views/Cruds/Coaches/ShowAll.vue";
import AllContactMessages from "../views/Cruds/ContactMessages/ShowAll.vue";
import AllFinancialReports from "../views/Cruds/FinancialReports/Show.vue";
import AllMainSpecializations from "../views/Cruds/MainSpecializations/ShowAll.vue";
import AllNotifications from "../views/Cruds/Notifications/ShowAll.vue";
import AllRates from "../views/Cruds/Rates/ShowAll.vue";
import AllRoles from "../views/Cruds/Roles/ShowAll.vue";
import AllSubscriptionsPrice from "../views/Cruds/SubscriptionsPrice/ShowAll.vue";
import AllSubspecialties from "../views/Cruds/Subspecialties/ShowAll.vue";
import AppContentHome from "../views/Cruds/AppContent/Home.vue";
import AppContentWrapper from "../pages/AppContentWrapper.vue";
import AppSettings from "../views/Cruds/AppSettings/AppSettings.vue";
import AqarConditions from "../views/Cruds/AppContent/AqarConditions.vue";
import AqarUses from "../views/Cruds/AppContent/AqarUses.vue";
import Authentication from "../pages/Authentication.vue";
import BankAccounts from "../views/Cruds/AppContent/BankAccounts.vue";
import CertificatesHome from "../views/Cruds/Certificates/Home.vue";
import ChangePhoneNumberForm from "../views/Auth/ChangePhoneNumber.vue";
import ClientsHome from "../views/Cruds/Clients/Home.vue";
import CoachesHome from "../views/Cruds/Coaches/Home.vue";
import ContactMessagesHome from "../views/Cruds/ContactMessages/Home.vue";
import CreateAdmin from "../views/Cruds/Admins/Create.vue";
import CreateAdvertisements from "../views/Cruds/Advertisements/Create.vue";
import CreateCertificates from "../views/Cruds/Certificates/Create.vue";
import CreateCoaches from "../views/Cruds/Coaches/Create.vue";
import CreateMainSpecializations from "../views/Cruds/MainSpecializations/Create.vue";
import CreateNotifications from "../views/Cruds/Notifications/Create.vue";
import CreateRole from "../views/Cruds/Roles/Create.vue";
import CreateSubspecialties from "../views/Cruds/Subspecialties/Create.vue";
import EditAdmin from "../views/Cruds/Admins/Edit.vue";
import EditAdvertisements from "../views/Cruds/Advertisements/Edit.vue";
import EditCertificates from "../views/Cruds/Certificates/Edit.vue";
import EditCoaches from "../views/Cruds/Coaches/Edit.vue";
import EditMainSpecializations from "../views/Cruds/MainSpecializations/Edit.vue";
import EditRole from "../views/Cruds/Roles/Edit.vue";
import EditSubspecialties from "../views/Cruds/Subspecialties/Edit.vue";
import EmailVerificationForm from "../views/Auth/EmailVerificationForm.vue";
import FinancialReportsHome from "../views/Cruds/FinancialReports/ShowAll.vue";
import ForbiddenPage from "../pages/ForbiddenPage.vue";
import GeneralSettings from "../views/Cruds/AppSettings/GeneralSettings.vue";
import ManagementSettings from "../views/Cruds/AppSettings/ContentDef.vue";
import HomePage from "../pages/HomePage.vue";
import LoginForm from "../views/Auth/LoginForm.vue";
import MainSpecializationsHome from "../views//Cruds/MainSpecializations/Home.vue";
import NotFoundPage from "../pages/NotFound.vue";
import NotificationsHome from "../views/Cruds/Notifications/Home.vue";
import PrivacyPolicy from "../views/Cruds/AppContent/PrivacyPolicy.vue";
import RatesHome from "../views/Cruds/Rates/Home.vue";
import ResetPasswordEmailForm from "../views/Auth/ResetPasswordEmailForm.vue";
import ResetPasswordForm from "../views/Auth/ResetPasswordForm.vue";
import RolesHome from "../views/Cruds/Roles/Home.vue";
import ShowAdmin from "../views/Cruds/Admins/Show.vue";
import ShowAdvertisements from "../views/Cruds/Advertisements/Show.vue";
import ShowCertificates from "../views/Cruds/Certificates/Show.vue";
import ShowClient from "../views/Cruds/Clients/Show.vue";
import ShowCoaches from "../views/Cruds/Coaches/Show.vue";
import ShowMainSpecializations from "../views/Cruds/MainSpecializations/Show.vue";
import ShowNotifications from "../views/Cruds/Notifications/Show.vue";
import ShowRates from "../views/Cruds/Rates/Show.vue";
import ShowSubscriptionsPrice from "../views/Cruds/SubscriptionsPrice/Show.vue";
import ShowSubspecialties from "../views/Cruds/Subspecialties/Show.vue";
import SubscriptionsPriceHome from "../views/Cruds/SubscriptionsPrice/Home.vue";
import SubspecialtiesHome from "../views/Cruds/Subspecialties/Home.vue";
import Terms from "../views/Cruds/AppContent/Terms.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import auth from "../middleware/auth.js";
import subscriptionsclients from "../views/Cruds/Clients/subscriptions.vue";

// Start:: Importing Middleware

// End:: Importing Middleware

// Start:: Importing Router Components

// Start:: Questiions Router Components
import questionsHome from "../views/Cruds/FAQ/Home.vue";
import Allquestions from "../views/Cruds/FAQ/ShowAll.vue";
import Createquestions from "../views/Cruds/FAQ/Create.vue";
import Editquestions from "../views/Cruds/FAQ/Edit.vue";
// End:: Questions Router Components

import message from "../views/Cruds/AppContent/Message.vue";
import section from "../views/Cruds/AppContent/Section.vue";
// ============== Start:: Home Page Route

// ============== End:: Home Page Route

// ============== Start:: Clients Routes

// ============== End:: Clients Routes

// ============== Start:: Advertisements Routes

// ============== End:: Advertisements Routes

// ============== Start:: Offers Routes

// ============== End:: Offers Routes

// ============== Start:: Packages Routes

// ============== End:: Packages Routess

// ============== Start:: Category Routes

// ============== End:: Category Routes

// ============== Start:: Rates Routes

// ============== End:: Rates Routes

// ============== Start:: Financial Reports Routes

// ============== End:: Financial Reports Routes

// ============== Start:: Contact Messages Routes

// ============== End:: Contact Messages Routes

// ============== Start:: App Content Routes

// ============== End:: App Content Routes

// ============== Start:: App Settings Routes

// ============== End:: App Settings Routes

// ============== Start:: Countries Routes

// ============== End:: Countries Routes

// ============== Start:: Cities Routes

// ============== End:: Cities Routes

// ============== Start:: Areas Routes

// ============== End:: Areas Routes

// ============== Start:: Districts Routes

// ============== End:: Districts Routes

// ============== Start:: Roles Routes

// ============== End:: Roles Routes

// ============== Start:: Admins Routes

// ============== End:: Admins Routes

// ============== Start:: Characteristics Routes

// ============== End:: Characteristics Routes

// ============== Start:: All Notifications Routes

// ============== End:: All Notifications Routes

// ============== Start:: EstateDepartments Routes

// ============== End:: EstateDepartments Routes

// ============== Start:: Banks Routes

// ============== End:: Banks Routes

// ============== Start:: additionalFields Routes

// ============== End:: additionalFields Routes

// ============== Start:: Forbidden Route

// ============== End:: Forbidden Route

// ============== Start:: Not Found Route

// ============== End:: Not Found Route
// End:: Importing Router Components

Vue.use(VueRouter);
const routes = [
  // ***************** Start:: Auth Routes Config
  {
    path: "/",
    component: Authentication,
    children: [
      {
        path: "/",
        component: LoginForm,
        name: "LoginForm",
      },
      {
        path: "/reset-password-email",
        name: "ResetPasswordEmailForm",
        component: ResetPasswordEmailForm,
      },
      {
        path: "/email-verification/:verification_type",
        name: "EmailVerificationForm",
        component: EmailVerificationForm,
      },
      {
        path: "/chang-phone-number",
        name: "ChangePhoneNumberForm",
        component: ChangePhoneNumberForm,
      },
      {
        path: "/reset-password",
        name: "ResetPasswordForm",
        component: ResetPasswordForm,
      },
    ],
  },
  // ***************** End:: Auth Routes Config

  // ***************** Start:: Content Routes Config
  {
    path: "/home",
    component: AppContentWrapper,
    children: [
      // Start:: Home Route Config
      {
        path: "/home",
        component: HomePage,
        meta: {
          middleware: [auth],
        },
      },
      // End:: Home Route Config

      // Start:: Clients Routes Config
      {
        path: "/clients",
        name: "ClientsHome",
        component: ClientsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllClients",
            component: AllClients,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients index",
                subject: "clients",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowClient",
            component: ShowClient,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients show",
                subject: "clients",
              },
            },
          },
          {
            path: "subscriptions/:id",
            name: "subscriptionsClients",
            component: subscriptionsclients,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "clients show",
                subject: "clients",
              },
            },
          },
        ],
      },
      // End:: Clients Routes Config
      // Start:: advertisements Routes Config
      {
        path: "/advertisements",
        name: "AdvertisementsHome",
        component: AdvertisementsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdvertisements",
            component: AllAdvertisements,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements index",
                subject: "advertisements",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdvertisements",
            component: ShowAdvertisements,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements show",
                subject: "advertisements",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdvertisements",
            component: CreateAdvertisements,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements create",
                subject: "advertisements",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdvertisements",
            component: EditAdvertisements,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "advertisements edit",
                subject: "advertisements",
              },
            },
          },
        ],
      },
      // End:: advertisements Routes Config

      // Start Main specializations Routes config
      {
        path: "/MainSpecializations",
        name: "MainSpecializationsHome",
        component: MainSpecializationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllMainSpecializations",
            component: AllMainSpecializations,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "specialties index",
                subject: "specialties",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowMainSpecializations",
            component: ShowMainSpecializations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "specialties show",
                subject: "specialties",
              },
            },
          },
          {
            path: "create",
            name: "CreateMainSpecializations",
            component: CreateMainSpecializations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "specialties create",
                subject: "specialties",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditMainSpecializations",
            component: EditMainSpecializations,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "specialties edit",
                subject: "specialties",
              },
            },
          },
        ],
      },
      // End Main specializations Routes config

      // Start Subspecialties Routes config
      {
        path: "/Subspecialties",
        name: "SubspecialtiesHome",
        component: SubspecialtiesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSubspecialties",
            component: AllSubspecialties,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subspecialties index",
                subject: "subspecialties",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowSubspecialties",
            component: ShowSubspecialties,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subspecialties show",
                subject: "subspecialties",
              },
            },
          },
          {
            path: "create",
            name: "CreateSubspecialties",
            component: CreateSubspecialties,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subspecialties create",
                subject: "subspecialties",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditSubspecialties",
            component: EditSubspecialties,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subspecialties edit",
                subject: "subspecialties",
              },
            },
          },
        ],
      },
      // End Subspecialties Routes config

      // Start Coaches Routes config
      {
        path: "/Coaches",
        name: "CoachesHome",
        component: CoachesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCoaches",
            component: AllCoaches,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coaches index",
                subject: "coaches",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCoaches",
            component: ShowCoaches,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coaches show",
                subject: "coaches",
              },
            },
          },
          {
            path: "create",
            name: "CreateCoaches",
            component: CreateCoaches,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coaches create",
                subject: "coaches",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCoaches",
            component: EditCoaches,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "coaches edit",
                subject: "coaches",
              },
            },
          },
        ],
      },
      // End Coaches Routes config

      // Start SubscriptionsPrice Routes config
      {
        path: "/SubscriptionsPrice",
        name: "SubscriptionsPriceHome",
        component: SubscriptionsPriceHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllSubscriptionsPrice",
            component: AllSubscriptionsPrice,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subscriptions index",
                subject: "subscriptions",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowSubscriptionsPrice",
            component: ShowSubscriptionsPrice,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "subscriptions show",
                subject: "subscriptions",
              },
            },
          },
        ],
      },
      // End SubscriptionsPrice Routes config
      // Start:: questions Routes Config
      {
        path: "/questions",
        name: "questionsHome",
        component: questionsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "Allquestions",
            component: Allquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions index",
                subject: "questions",
              },
            },
          },
          {
            path: "create",
            name: "Createquestions",
            component: Createquestions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions create",
                subject: "questions",
              },
            },
          },
          {
            path: "edit/:id",
            name: "Editquestions",
            component: Editquestions,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "questions edit",
                subject: "questions",
              },
            },
          },
        ],
      },
      // End:: questions Routes Config

      // Start Certificates Routes config
      {
        path: "/Certificates",
        name: "CertificatesHome",
        component: CertificatesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllCertificates",
            component: AllCertificates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "certificates index",
                subject: "certificates",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowCertificates",
            component: ShowCertificates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "certificates show",
                subject: "certificates",
              },
            },
          },
          {
            path: "create",
            name: "CreateCertificates",
            component: CreateCertificates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "certificates create",
                subject: "certificates",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditCertificates",
            component: EditCertificates,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "certificates edit",
                subject: "certificates",
              },
            },
          },
        ],
      },
      // End Certificates Routes config

      // Start:: Rates Routes Config
      {
        path: "/rates",
        name: "RatesHome",
        component: RatesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRates",
            component: AllRates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "rates index",
                subject: "rates",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowRates",
            component: ShowRates,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "rates show",
                subject: "rates",
              },
            },
          },
        ],
      },
      // End:: Rates Routes Config

      // Start:: Financial Reports Routes Config
      {
        path: "/financial-reports",
        name: "FinancialReportsHome",
        component: FinancialReportsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllFinancialReports",
            component: AllFinancialReports,
            meta: {
              middleware: [auth],
            },
          },
          // {
          //   path: "show/:id",
          //   name: "ShowFinancialReport",
          //   component: ShowFinancialReport,
          //   props: true,
          //   meta: {
          //     middleware: [auth],
          //   },
          // },
        ],
      },
      // End:: Financial Reports Routes Config

      // Start:: Contact Messages Routes Config
      {
        path: "/contact-messages",
        name: "ContactMessagesHome",
        component: ContactMessagesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllContactMessages",
            component: AllContactMessages,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "contactuses index",
                subject: "contactuses",
              },
            },
          },
        ],
      },
      // End:: Contact Messages Routes Config

      // Start:: App Content Routes Config
      {
        path: "/app-content",
        name: "AppContentHome",
        component: AppContentHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "about-us",
            name: "AboutUs",
            component: AboutUs,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "terms",
            name: "Terms",
            component: Terms,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "policy",
            name: "PrivacyPolicy",
            component: PrivacyPolicy,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "aqar-uses",
            name: "AqarUses",
            component: AqarUses,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "message",
            name: "message",
            component: message,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "section",
            name: "section",
            component: section,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "aqar-conditions",
            name: "AqarConditions",
            component: AqarConditions,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
          {
            path: "bank-accounts",
            name: "BankAccounts",
            component: BankAccounts,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "settings create",
                subject: "settings",
              },
            },
          },
        ],
      },
      // End:: App Content Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/settings",
        component: AppSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: App Settings Routes Config
      {
        path: "/contact_settings",
        component: GeneralSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },

      {
        path: "/management_settings",
        component: ManagementSettings,
        meta: {
          middleware: [auth],
          requiresPermission: {
            action: "settings create",
            subject: "settings",
          },
        },
      },
      // End:: App Settings Routes Config

      // Start:: Roles Routes Config
      {
        path: "/roles",
        name: "RolesHome",
        component: RolesHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllRoles",
            component: AllRoles,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles index",
                subject: "roles",
              },
            },
          },
          {
            path: "create",
            name: "CreateRole",
            component: CreateRole,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles create",
                subject: "roles",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditRole",
            component: EditRole,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "roles edit",
                subject: "roles",
              },
            },
          },
        ],
      },
      // End:: Roles Routes Config

      // Start:: Admins Routes Config
      {
        path: "/admins",
        name: "AdminsHome",
        component: AdminsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllAdmins,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins index",
                subject: "admins",
              },
            },
          },
          {
            path: "create",
            name: "CreateAdmin",
            component: CreateAdmin,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins create",
                subject: "admins",
              },
            },
          },
          {
            path: "edit/:id",
            name: "EditAdmin",
            component: EditAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins edit",
                subject: "admins",
              },
            },
          },
          {
            path: "show/:id",
            name: "ShowAdmin",
            component: ShowAdmin,
            props: true,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "admins show",
                subject: "admins",
              },
            },
          },
        ],
      },
      // End:: Admins Routes Config

      // Start:: All Notifications Route Config
      {
        path: "/all-notifications",
        name: "NotificationsHome",
        component: NotificationsHome,
        meta: {
          middleware: [auth],
        },
        children: [
          {
            path: "all",
            name: "AllAdmins",
            component: AllNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications index",
                subject: "notifications",
              },
            },
          },
          {
            path: "create",
            name: "CreateNotificationss",
            component: CreateNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications create",
                subject: "notifications",
              },
            },
          },
          {
            path: "show",
            name: "ShowNotificationss",
            component: ShowNotifications,
            meta: {
              middleware: [auth],
              requiresPermission: {
                action: "notifications show",
                subject: "notifications",
              },
            },
          },
        ],
      },
      // End:: All Notifications Route Config
    ],
  },
  // ***************** End:: Content Routes Config

  // ***************** Start:: Forbidden Route Config
  {
    path: "/forbidden",
    name: "ForbiddenPage",
    component: ForbiddenPage,
  },
  // ***************** End:: Forbidden Route Config

  // ***************** Start:: Not Found Route Config
  {
    path: "/:notFound(.*)",
    name: "NotFoundPage",
    component: NotFoundPage,
  },
  // ***************** End:: Not Found Route Config
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },
  routes,
});

// Start:: Middleware And Router Guards
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

// Authentication and Permission Check Middleware
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(
    "Saramh_admin_dashboard_user_token"
  );

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = { from, next, router, to };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  } else if (isAuthenticated) {
    const publicRoutes = [
      "LoginForm",
      "ResetPasswordEmailForm",
      "PhoneVerification",
      "ChangePhoneNumberForm",
      "ResetPasswordForm",
    ];

    if (publicRoutes.includes(to.name)) {
      return next("/home");
    }
  }

  if (to.meta.requiresPermission) {
    const { action, subject } = to.meta.requiresPermission;
    const storedPermissions = JSON.parse(
      localStorage.getItem("Saramh_admin_roles")
    )?.permissions;

    if (
      storedPermissions &&
      storedPermissions.some(
        (permission) =>
          permission.action === action && permission.subject === subject
      )
    ) {
      return next();
    } else {
      return next("/forbidden");
    }
  }

  return next();
});

export default router;
