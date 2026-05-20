export const fetchAppointments = async (searchTerm = "") => {
  const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/appointments?search=${searchTerm}`);
  const data = res.json();
  return data || [];
}