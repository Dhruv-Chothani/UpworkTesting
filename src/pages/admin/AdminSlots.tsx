import { useSlots } from "@/hooks/useSlots";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const AdminSlots = () => {
  const { slots, bookings, addSlot, deleteSlot, toggleSlotActive, updateBookingStatus } = useSlots({ admin: true });
  const { toast } = useToast();
  const [newTime, setNewTime] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleAddSlot = () => {
    if (!newTime || !newLabel) return;
    addSlot(newTime, newLabel);
    setNewTime("");
    setNewLabel("");
    toast({ title: "Slot added!" });
  };

  const handleDeleteSlot = (id: string) => {
    if (confirm("Delete this slot?")) {
      deleteSlot(id);
      toast({ title: "Slot deleted" });
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Manage Time Slots</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Time Slots</h2>
          <div className="bg-card rounded-xl p-4 shadow-card mb-4">
            <div className="flex gap-2 mb-4">
              <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="px-3 py-2 border rounded-lg" />
              <input type="text" value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label (e.g., 9:00 AM)" className="flex-1 px-3 py-2 border rounded-lg" />
              <Button onClick={handleAddSlot}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-auto">
              {slots.map(slot => (
                <div key={slot.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleSlotActive(slot.id)}>
                      {slot.isActive ? <ToggleRight className="w-6 h-6 text-green-500" /> : <ToggleLeft className="w-6 h-6 text-muted-foreground" />}
                    </button>
                    <span className={slot.isActive ? "" : "line-through text-muted-foreground"}>{slot.label} ({slot.time})</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteSlot(slot.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="bg-card rounded-xl p-4 shadow-card space-y-2 max-h-[500px] overflow-auto">
            {bookings.length === 0 ? (
              <p className="text-muted-foreground">No bookings yet</p>
            ) : (
              bookings.slice().reverse().map(b => (
                <div key={b.id} className="p-3 bg-secondary rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{b.patientName}</p>
                      <p className="text-sm text-muted-foreground">{b.date} at {b.slotTime}</p>
                      <p className="text-sm">{b.patientPhone}</p>
                    </div>
                    <select
                      value={b.status}
                      onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                      className="px-2 py-1 text-sm border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  {b.concern && <p className="text-sm text-muted-foreground">{b.concern}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSlots;
