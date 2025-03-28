<script lang="ts">
    import {
        Alliance,
        TournamentLevel,
        type FullMatchFragment,
    } from "../../graphql/generated/graphql-operations";
    import { sortTeams } from "../../util/sorters";
    import DeLives from "./DELives.svelte";
    import MatchScore, { computeWinner } from "./MatchScore.svelte";
    import MatchTeam from "./MatchTeam.svelte";
    import PlaceholderMatchTeam from "./PlaceholderMatchTeam.svelte";

    export let match: FullMatchFragment;
    export let eventCode: string;
    export let season: number;
    export let timeZone: string;
    export let focusedTeam: number | null;
    export let zebraStripe: boolean;
    export let newRound: boolean = false;
    export let teamCount = 0;

    $: teams = match.teams;
    $: redTeams = teams.filter((t) => t.alliance == Alliance.Red);
    $: blueTeams = teams.filter((t) => t.alliance == Alliance.Blue);

    $: redExtras = Array(Math.max(2 - redTeams.length, 0)).fill(Alliance.Red);
    $: reds = [...redTeams, ...redExtras].sort(sortTeams);
    $: blueExtras = Array(Math.max(2 - blueTeams.length, 0)).fill(Alliance.Blue);
    $: blues = [...blueTeams, ...blueExtras].sort(sortTeams);

    $: isDoubleElim = match.tournamentLevel == TournamentLevel.DoubleElim;

    $: winner = computeWinner(match.scores);

    function hasAlreadyLost(matchNum: number, teamCount: number, alliance: Alliance): boolean {
        if (teamCount <= 10) {
            return false;
        } else if (teamCount <= 20) {
            return (
                matchNum == 3 ||
                matchNum == 5 ||
                (matchNum == 6 && alliance == Alliance.Blue) ||
                matchNum == 7
            );
        } else if (teamCount <= 40) {
            return (
                matchNum == 5 ||
                matchNum == 6 ||
                matchNum == 8 ||
                matchNum == 9 ||
                (matchNum == 10 && alliance == Alliance.Blue) ||
                matchNum == 11
            );
        } else {
            return (
                matchNum == 5 ||
                matchNum == 6 ||
                matchNum == 9 ||
                matchNum == 10 ||
                matchNum == 12 ||
                matchNum == 13 ||
                (matchNum == 14 && alliance == Alliance.Blue) ||
                matchNum == 15
            );
        }
    }
</script>

<tr class:zebraStripe class:isDoubleElim class:new-round={newRound}>
    <MatchScore {match} {timeZone} />

    {#if isDoubleElim}
        <DeLives
            alliance={Alliance.Red}
            alreadyLost={hasAlreadyLost(match.matchNum, teamCount, Alliance.Red)}
            lostThis={winner == Alliance.Blue}
        />
    {/if}

    {#each reds as team}
        {#if team == Alliance.Red}
            <PlaceholderMatchTeam alliance={team} span={6 / reds.length} />
        {:else}
            <MatchTeam
                {team}
                {eventCode}
                {season}
                {focusedTeam}
                winner={winner == Alliance.Red}
                span={6 / reds.length}
            />
        {/if}
    {/each}

    {#if isDoubleElim}
        <DeLives
            alliance={Alliance.Blue}
            alreadyLost={hasAlreadyLost(match.matchNum, teamCount, Alliance.Blue)}
            lostThis={winner == Alliance.Red}
        />
    {/if}

    {#each blues as team}
        {#if team == Alliance.Blue}
            <PlaceholderMatchTeam alliance={team} span={6 / blues.length} />
        {:else}
            <MatchTeam
                {team}
                {eventCode}
                {season}
                {focusedTeam}
                winner={winner == Alliance.Blue}
                span={6 / blues.length}
            />
        {/if}
    {/each}
</tr>

<style>
    tr {
        display: grid;
        grid-template-columns: 10.75em repeat(12, 1fr);

        min-height: 28px;
    }

    tr.isDoubleElim {
        grid-template-columns: 10.75em auto repeat(6, 1fr) auto repeat(6, 1fr);
    }

    tr.new-round {
        border-top: 1px solid var(--sep-color);
    }

    @media (max-width: 1000px) {
        tr {
            grid-template-columns: 9.75em repeat(12, 1fr);
        }

        tr.isDoubleElim {
            grid-template-columns: 9.75em auto repeat(6, 1fr) auto repeat(6, 1fr);
        }
    }

    .zebraStripe {
        background: var(--zebra-stripe-color);
    }
</style>
