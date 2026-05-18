export const fetchAppointments = async () => {
  const res = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
  const data = res.json();
  return data || [];
}