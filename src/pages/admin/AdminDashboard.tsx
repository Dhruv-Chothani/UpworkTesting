import { useSlots } from "@/hooks/useSlots";
import { useBlogs } from "@/hooks/useBlogs";
import { Calendar, BookOpen, Users, TrendingUp, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { bookings, slots, deleteBooking } = useSlots({ admin: true });
  const { blogs } = useBlogs();

  // Sort bookings by createdAt (newest first) and filter for today only
  const sortedBookings = [...bookings]
    .filter(b => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      return b.date === today;
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-500" },
    { label: "Active Slots", value: slots.filter(s => s.isActive).length, icon: Users, color: "bg-green-500" },
    { label: "Published Blogs", value: blogs.filter(b => b.published).length, icon: BookOpen, color: "bg-purple-500" },
    { label: "Pending", value: bookings.filter(b => b.status === 'pending').length, icon: TrendingUp, color: "bg-orange-500" },
  ];

  const handleDeleteBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
      } catch (error) {
        console.error('Failed to delete booking:', error);
        alert('Failed to delete booking. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl p-4 sm:p-6 shadow-card">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-card">
          <h2 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4">Today's Bookings</h2>
          {sortedBookings.slice(0, 5).map(b => (
            <div key={b.id} className="flex flex-col sm:flex-row sm:justify-between gap-2 py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{b.patientName}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{b.date} at {b.slotTime}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {b.status}
                </span>
               
              </div>
            </div>
          ))}
          {sortedBookings.length === 0 && <p className="text-muted-foreground text-sm sm:text-base">No bookings for today</p>}
        </div>

        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-card">
          <h2 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/homepage" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 text-sm sm:text-base transition-colors">Edit Home Page Content</Link>
            <Link to="/admin/blogs" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 text-sm sm:text-base transition-colors">Manage Blog Posts</Link>
            <Link to="/admin/slots" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 text-sm sm:text-base transition-colors">Configure Time Slots</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
