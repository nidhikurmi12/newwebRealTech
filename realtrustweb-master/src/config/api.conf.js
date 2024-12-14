const api = {
  //global apis
  getProperties: "/properties",
  rentProperties: "/properties/for-rent",
  sellProperties: "/properties/for-sale",
  sendOtpToOwner: "/owner/otp/send",
  sendOtpToUser: "/user/otp/send",
  userRegister: "/user/register",
  ownerRegister: "/owner/register",
  ownerLogin: "/owner/login",
  userLogin: "/user/login",
  gallery: "/galaryImage",
  contact: "/contacts",
  amenities: "/amenities",
  verifyPayment: "/verify-payment",
  userPay:"/user/create-order",
  upcomingProject:"/properties/for-upcoming-project",
  inquery:"/inquery",
  slider:"/sliders",
  
  //owner apis
  ownerDashboard: "/owner/dashboard",
  ownerProfile: "/owner/profile",
  ownerPropertiesList: "/owner/properties/properties_list",
  addPropertyInOwner: "/owner/properties/store",
  viewOwnerPeroperties: "/owner/properties",
  viewOwnerPropertiesFilter: "/owner/properties/properties_list",
  ownerLogout: "/owner/logout",
  blogPosts: "/posts",
  ownerUplodDoc: "/owner/upload-documents",
  ownerAgreement: "/owner/upload-agreement",
  ownerNotification: "/owner/get-notification",
  //user Apis
  userDashboard: "/user/dashboard",
  userProfile: "/user/profile",
  userPropertiesList: "/user/properties/properties_list",
  viewUserPeroperties: "/user/properties/id",
  userLogout: "/user/logout",
  userUplodDoc: "/user/upload-documents",
  userSchedule: "/schedule_properties",
  userPaymentHistory: "/user/payment-history",
  userAggerement: "/user/upload-agreement",
  userScheduleHistory: "/user/history_schedule_properties",
};

export default api;
