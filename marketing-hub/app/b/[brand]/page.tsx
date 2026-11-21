import { listEvents } from "@/lib/events";
import { todayIso } from "@/lib/dates";
import { Workspace } from "@/components/Workspace";
import { listEventTypes } from "@/lib/eventTypes";
import { listChannels } from "@/lib/channelOptions";
import { listStages } from "@/lib/stages";
import { Calendar } from "@/components/Calendar";
import { LoadError } from "@/components/LoadError";

export const dynamic = "force-dynamic";

/** The board's home is its calendar. */
export default async function CalendarPage() {
  try {
    const [events, eventTypes, channelOptions, stages] = await Promise.all([
      listEvents(),
      listEventTypes(),
      listChannels(),
      listStages(),
    ]);

    return (
      <Workspace
        initialEvents={events}
        eventTypes={eventTypes}
        channelOptions={channelOptions}
        stages={stages}
      >
        <Calendar serverToday={todayIso()} />
      </Workspace>
    );
  } catch (error) {
    return <LoadError error={error} />;
  }
}
