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
    img: "/icons/admin/home.png",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.png",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/docs.png",
    route: "/admin/docs",
    text: "All Docs",
  },
  
  {
    img: "/icons/admin/folder.svg",
    route: "/admin/projects",
    text: "All Projects",
  },
  
];