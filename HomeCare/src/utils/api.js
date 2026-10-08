import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

export const getAppliances = () => api.get("/appliances");
export const getAppliance = (id) => api.get(`/appliances/${id}`);
export const getBookings = () => api.get("/bookings");
export const createBooking = (data) => api.post("/bookings", data);
export const updateBooking = (id, data) => api.patch(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
export const createContact = (data) => api.post("/contacts", data);
export const getContacts = () => api.get("/contacts");

export default api;
