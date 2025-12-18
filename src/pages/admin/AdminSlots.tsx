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
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Manage Time Slots</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4">Time Slots</h2>
          <div className="bg-card rounded-xl p-3 sm:p-4 shadow-card mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row gap-2 mb-3 sm:mb-4">
              <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="px-3 py-2 border rounded-lg text-sm sm:text-base" />
              <input type="text" value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label (e.g., 9:00 AM)" className="flex-1 px-3 py-2 border rounded-lg text-sm sm:text-base" />
              <Button onClick={handleAddSlot} className="text-sm sm:text-base"><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-auto">
              {slots.map(slot => (
                <div key={slot.id} className="flex items-center justify-between p-2 sm:p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <button onClick={() => toggleSlotActive(slot.id)} className="flex-shrink-0">
                      {slot.isActive ? <ToggleRight className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" /> : <ToggleLeft className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />}
                    </button>
                    <span className={`text-sm sm:text-base truncate ${slot.isActive ? "" : "line-through text-muted-foreground"}`}>{slot.label} ({slot.time})</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteSlot(slot.id)} className="flex-shrink-0"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4">Recent Bookings</h2>
          <div className="bg-card rounded-xl p-3 sm:p-4 shadow-card space-y-2 max-h-[500px] overflow-auto">
            {bookings.length === 0 ? (
              <p className="text-muted-foreground text-sm sm:text-base">No bookings yet</p>
            ) : (
              bookings.slice().reverse().map(b => (
                <div key={b.id} className="p-3 bg-secondary rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">{b.patientName}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{b.date} at {b.slotTime}</p>
                      <p className="text-xs sm:text-sm">{b.patientPhone}</p>
                    </div>
                    <select
                      value={b.status}
                      onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                      className="px-2 py-1 text-xs sm:text-sm border rounded self-start"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  {b.concern && <p className="text-xs sm:text-sm text-muted-foreground break-words">{b.concern}</p>}
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
