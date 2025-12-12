import { useSlots } from "@/hooks/useSlots";
import { useBlogs } from "@/hooks/useBlogs";
import { Calendar, BookOpen, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { bookings, slots } = useSlots();
  const { blogs } = useBlogs();

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-500" },
    { label: "Active Slots", value: slots.filter(s => s.isActive).length, icon: Users, color: "bg-green-500" },
    { label: "Published Blogs", value: blogs.filter(b => b.published).length, icon: BookOpen, color: "bg-purple-500" },
    { label: "Pending", value: bookings.filter(b => b.status === 'pending').length, icon: TrendingUp, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-card">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="font-heading text-xl font-bold mb-4">Recent Bookings</h2>
          {bookings.slice(-5).reverse().map(b => (
            <div key={b.id} className="flex justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="font-medium">{b.patientName}</p>
                <p className="text-sm text-muted-foreground">{b.date} at {b.slotTime}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {b.status}
              </span>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-muted-foreground">No bookings yet</p>}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="font-heading text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/home" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80">Edit Home Page Content</Link>
            <Link to="/admin/blogs" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80">Manage Blog Posts</Link>
            <Link to="/admin/slots" className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80">Configure Time Slots</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
