import { CURRENT_SEASON, PAST_SEASONS } from "@ftc-scout/common";
import { DataHasBeenLoaded } from "../db/entities/DataHasBeenLoaded";
import { loadAllTeams } from "../db/loaders/load-all-teams";
import { loadAllEvents } from "../db/loaders/load-all-events";

export async function fetchPriorSeasons() {
    for (let season of PAST_SEASONS) {
        console.info(`Checking load of season ${season}.`);
        if (!(await DataHasBeenLoaded.teamsHaveBeenLoaded(season))) {
            await loadAllTeams(season);
        } else {
            console.info(`Teams already loaded.`);
        }
        if (!(await DataHasBeenLoaded.eventsHaveBeenLoaded(season))) {
            await loadAllEvents(season);
        } else {
            console.info(`Events already loaded.`);
        }
    }
}

export async function watchApi() {
    let cycleCount = 0;

    const runJob = async (fn: Function, interval: number) => {
        if (cycleCount % interval == 0) {
            try {
                await fn();
            } catch (e) {
                console.error("!!! ERROR LOADING DATA !!!");
                console.error(e);
            }
        }
    };

    const MS_PER_MIN = 60 * 1000;
    const MINS_PER_HOUR = 60;
    const MINS_PER_DAY = MINS_PER_HOUR * 24;

    const run = async () => {
        console.info(`Syncing. (Cycle ${cycleCount})`);
        await runJob(async () => await loadAllTeams(CURRENT_SEASON), MINS_PER_DAY);
        await runJob(async () => await loadAllEvents(CURRENT_SEASON), MINS_PER_HOUR);

        cycleCount += 1;
        setTimeout(run, MS_PER_MIN);
    };

    run();
}
