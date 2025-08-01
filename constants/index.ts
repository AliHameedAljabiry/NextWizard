export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  companyName: "Company Name",
  terms: "Terms",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  password: "password",
  confirmPassword: "password",
  companyName: "text",
  terms: "checkbox",
};

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/content",
    text: "All Content",
  },
  
];