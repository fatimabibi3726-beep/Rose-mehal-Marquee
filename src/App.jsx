import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import ServiceCatalogue from './pages/ServiceCatalogue.jsx'
import CustomerDashboard from './pages/CustomerDashboard.jsx'
import CreateBooking from './pages/CreateBooking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Payment from './pages/Payment.jsx'
import Notifications from './pages/Notifications.jsx'
import MyPayments from './pages/MyPayments.jsx'
import CustomerSettings from './pages/CustomerSettings.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminUsers from './pages/AdminUsers.jsx'
import AdminBookings from './pages/AdminBookings.jsx'
import AdminFood from './pages/AdminFood.jsx'
import AdminDecorations from './pages/AdminDecorations.jsx'
import AdminPayments from './pages/AdminPayments.jsx'
import AdminReports from './pages/AdminReports.jsx'
import AdminNotifications from './pages/AdminNotifications.jsx'
import AdminSettings from './pages/AdminSettings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/services" element={<ServiceCatalogue />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/bookings/new" element={<CreateBooking />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/payments" element={<MyPayments />} />
      <Route path="/settings" element={<CustomerSettings />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/food" element={<AdminFood />} />
      <Route path="/admin/decorations" element={<AdminDecorations />} />
      <Route path="/admin/payments" element={<AdminPayments />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
    </Routes>
  )
}
