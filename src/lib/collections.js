import {
  SERVICE_CATEGORIES, PROJECT_CATEGORIES, PROJECT_STATUSES, EMPLOYEE_DEPARTMENTS,
  GALLERY_CATEGORIES, REGIONS, CLIENT_TYPES, JOB_TYPES, JOB_STATUSES, NEWS_CATEGORIES,
} from "./defaultContent";
import { slugify } from "./useSiteContent";

// Config-driven definitions for the generic Admin CRUD sections. Each entry
// describes: where it lives in content (key), how list rows render
// (title/subtitle/image), the empty-record shape, and its edit-modal fields.

export const COLLECTIONS = {
  services: {
    key: "services",
    label: "Services",
    icon: "Cog",
    idPrefix: "sv",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "select", options: SERVICE_CATEGORIES },
      { key: "icon", label: "Icon", type: "icon" },
      { key: "shortDesc", label: "Short Description (card)", type: "textarea" },
      { key: "description", label: "Full Description (detail page)", type: "textarea" },
    ],
    empty: { title: "", category: SERVICE_CATEGORIES[0], icon: "Cog", shortDesc: "", description: "" },
    beforeSave: (item) => ({ ...item, slug: item.slug || slugify(item.title) }),
  },

  projects: {
    key: "projects",
    label: "Projects",
    icon: "Factory",
    idPrefix: "pr",
    titleField: "title",
    subtitleField: "country",
    fields: [
      { key: "title", label: "Project Title", type: "text" },
      { key: "country", label: "Country", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "client", label: "Client", type: "text" },
      { key: "category", label: "Category", type: "multiselect", options: PROJECT_CATEGORIES },
      { key: "status", label: "Status", type: "select", options: PROJECT_STATUSES },
      { key: "startDate", label: "Start Date", type: "date" },
      { key: "completionDate", label: "Completion Date", type: "date" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "servicesProvided", label: "Services Provided", type: "tags" },
      { key: "images", label: "Images", type: "multiimage" },
      { key: "video", label: "Video URL (optional)", type: "text" },
    ],
    empty: { title: "", country: "", location: "", client: "", category: [], status: "Current", startDate: "", completionDate: "", description: "", servicesProvided: [], images: [], video: "" },
  },

  news: {
    key: "news",
    label: "News",
    icon: "Newspaper",
    idPrefix: "nw",
    titleField: "title",
    subtitleField: "category",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "category", label: "Category", type: "select", options: NEWS_CATEGORIES },
      { key: "date", label: "Date", type: "date" },
      { key: "author", label: "Author", type: "text" },
      { key: "image", label: "Featured Image", type: "image" },
      { key: "images", label: "Additional Images", type: "multiimage" },
      { key: "content", label: "Content", type: "textarea" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
    empty: { title: "", category: NEWS_CATEGORIES[0], date: new Date().toISOString().slice(0, 10), author: "", image: "", images: [], content: "", tags: [] },
  },

  employees: {
    key: "employees",
    label: "Employees",
    icon: "Users",
    idPrefix: "em",
    titleField: "name",
    subtitleField: "position",
    fields: [
      { key: "photo", label: "Photo", type: "image", round: true },
      { key: "name", label: "Full Name", type: "text" },
      { key: "position", label: "Position", type: "text" },
      { key: "department", label: "Department", type: "select", options: EMPLOYEE_DEPARTMENTS },
      { key: "region", label: "Region", type: "select", options: REGIONS },
      { key: "yearsExperience", label: "Years of Experience", type: "number" },
      { key: "certifications", label: "Certifications", type: "tags" },
      { key: "bio", label: "Professional Biography", type: "textarea" },
    ],
    empty: { photo: "", name: "", position: "", department: EMPLOYEE_DEPARTMENTS[0], region: REGIONS[0], yearsExperience: 0, certifications: [], bio: "" },
  },

  gallery: {
    key: "gallery",
    label: "Gallery",
    icon: "ImageIcon",
    idPrefix: "gl",
    titleField: "caption",
    subtitleField: "category",
    fields: [
      { key: "photo", label: "Photo", type: "image" },
      { key: "category", label: "Category", type: "select", options: GALLERY_CATEGORIES },
      { key: "caption", label: "Caption", type: "text" },
      { key: "project", label: "Associated Project", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "date", label: "Date", type: "date" },
    ],
    empty: { photo: "", category: GALLERY_CATEGORIES[0], caption: "", project: "", location: "", date: new Date().toISOString().slice(0, 10) },
    requireField: "photo",
  },

  locations: {
    key: "locations",
    label: "Locations",
    icon: "MapPin",
    idPrefix: "lc",
    titleField: "city",
    subtitleField: "region",
    fields: [
      { key: "type", label: "Type", type: "select", options: ["Headquarters", "Regional Office"] },
      { key: "region", label: "Region", type: "select", options: REGIONS },
      { key: "country", label: "Country", type: "text" },
      { key: "city", label: "City", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
    ],
    empty: { type: "Regional Office", region: REGIONS[0], country: "", city: "", address: "", phone: "", email: "" },
  },

  jobs: {
    key: "jobs",
    label: "Job Vacancies",
    icon: "Briefcase",
    idPrefix: "jb",
    titleField: "title",
    subtitleField: "location",
    fields: [
      { key: "title", label: "Job Title", type: "text" },
      { key: "location", label: "Location", type: "text" },
      { key: "department", label: "Department", type: "select", options: EMPLOYEE_DEPARTMENTS },
      { key: "type", label: "Employment Type", type: "select", options: JOB_TYPES },
      { key: "status", label: "Status", type: "select", options: JOB_STATUSES },
      { key: "deadline", label: "Application Deadline", type: "date" },
      { key: "description", label: "Job Description", type: "textarea" },
      { key: "requirements", label: "Requirements", type: "textarea" },
    ],
    empty: { title: "", location: "", department: EMPLOYEE_DEPARTMENTS[0], type: JOB_TYPES[0], status: "Open", deadline: "", description: "", requirements: "" },
  },

  clients: {
    key: "clients",
    label: "Clients & Partners",
    icon: "Handshake",
    idPrefix: "cl",
    titleField: "name",
    subtitleField: "type",
    fields: [
      { key: "logo", label: "Logo", type: "image" },
      { key: "name", label: "Name", type: "text" },
      { key: "type", label: "Type", type: "select", options: CLIENT_TYPES },
    ],
    empty: { logo: "", name: "", type: CLIENT_TYPES[0] },
  },

  staff: {
    key: "staff",
    label: "Staff Accounts",
    icon: "Lock",
    idPrefix: "st",
    titleField: "name",
    subtitleField: "email",
    fields: [
      { key: "name", label: "Full Name", type: "text" },
      { key: "email", label: "Email (used to log in)", type: "text" },
      { key: "code", label: "Access Code (used to log in)", type: "text" },
      { key: "department", label: "Department", type: "select", options: EMPLOYEE_DEPARTMENTS },
      { key: "active", label: "Active", type: "checkbox", checkboxLabel: "Account can log in" },
    ],
    empty: { name: "", email: "", code: "", department: EMPLOYEE_DEPARTMENTS[0], permissions: { news: true, projects: true, employees: true, gallery: true }, active: true },
  },
};

export const COLLECTION_ORDER = ["services", "projects", "news", "employees", "gallery", "locations", "jobs", "clients", "staff"];
