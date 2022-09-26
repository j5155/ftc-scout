import {
    Tep2019FieldName,
    Tep2019Group,
    type FullStatsGroup2019Fragment,
} from "../../../../graphql/generated/graphql-operations";
import { DisplayWhen, makeStat, type Stat } from "../../Stat";
import { StatColor } from "../../stat-color";
import { StatDisplayType } from "../../stat-display-type";
import { groupGetter, type StatSet, type StatSetGroup } from "../../StatSet";

export type FullTep2019 = {
    team: {
        number: number;
        name: string;
    };
    stats: {
        __typename?: "TeamEventStats2019Traditional";
        rank: number;
        rp2019: number;
        tb: number;
        wins: number;
        losses: number;
        ties: number;
        dqs: number;
        qualMatchesPlayed: number;
        total: FullStatsGroup2019Fragment;
        average: FullStatsGroup2019Fragment;
        opr: FullStatsGroup2019Fragment;
        min: FullStatsGroup2019Fragment;
        max: FullStatsGroup2019Fragment;
        standardDev: FullStatsGroup2019Fragment;
    };
};

export const TEAM_STAT: Stat<FullTep2019> = {
    color: StatColor.WHITE,
    displayType: StatDisplayType.TEAM,
    listName: "Team",
    columnName: "Team",
    identifierName: "Team",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.team,
    apiField: { fieldName: Tep2019FieldName.TeamNumber },
};

export const RP_STAT: Stat<FullTep2019> = {
    color: StatColor.RED,
    displayType: StatDisplayType.DECIMAL,
    listName: "Ranking Points (RP)",
    columnName: "RP",
    identifierName: "Ranking Points (RP)",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.rp2019,
    apiField: { fieldName: Tep2019FieldName.Rp },
};

export const EVENT_RANK_STAT: Stat<FullTep2019> = {
    color: StatColor.WHITE,
    displayType: StatDisplayType.RANK,
    listName: "Ranking",
    columnName: "Rank",
    identifierName: "Event Ranking",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.rank,
    apiField: { fieldName: Tep2019FieldName.Rank },
};

export const TBP_STAT: Stat<FullTep2019> = {
    color: StatColor.LIGHT_BLUE,
    displayType: StatDisplayType.DECIMAL,
    listName: "Tie Breaker Points (TBP)",
    columnName: "TBP",
    identifierName: "Tie Breaker Points (TBP)",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.tb,
    apiField: { fieldName: Tep2019FieldName.Tb },
};

export const PLAYED_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Matches Played",
    columnName: "Played",
    identifierName: "Qual Matches Played",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.qualMatchesPlayed,
    apiField: { fieldName: Tep2019FieldName.QualMatchesPlayed },
};

export const WINS_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Wins",
    columnName: "Wins",
    identifierName: "Wins",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.wins,
    apiField: { fieldName: Tep2019FieldName.Wins },
};

export const LOSSES_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Losses",
    columnName: "Losses",
    identifierName: "Losses",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.losses,
    apiField: { fieldName: Tep2019FieldName.Losses },
};

export const TIES_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Ties",
    columnName: "Ties",
    identifierName: "Ties",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.ties,
    apiField: { fieldName: Tep2019FieldName.Ties },
};

export const RECORD_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.RECORD,
    listName: "Record",
    columnName: "Record",
    identifierName: "Event Record",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => ({ wins: s.data.stats.wins, losses: s.data.stats.losses, ties: s.data.stats.ties }),
    apiField: { fieldName: Tep2019FieldName.Wins },
};

export const DQ_STAT: Stat<FullTep2019> = {
    color: StatColor.GREEN,
    displayType: StatDisplayType.INTEGER,
    listName: "Disqualifications (DQs)",
    columnName: "DQs",
    identifierName: "Disqualifications (DQs)",
    displayWhen: DisplayWhen.ALWAYS,
    read: (s) => s.data.stats.dqs,
    apiField: { fieldName: Tep2019FieldName.Dq },
};

type Group = FullTep2019["stats"]["total"];

export const TOTAL_STAT: Stat<Group> = makeStat(
    "totalPoints",
    "Total Points",
    "",
    "Total Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.TotalPoints
);
export const TOTAL_NP_STAT: Stat<Group> = makeStat(
    "totalPointsNp",
    "Total Points No Penalties",
    "np",
    "Total Points No Penalties",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.TotalPointsNp
);

// ------------------------------------------------------------------------------------------------------------------------

export const AUTO_STAT: Stat<Group> = makeStat(
    "autoPoints",
    "Auto Points",
    "Auto",
    "Auto Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoPoints
);

export const AUTO_NAV_STAT: Stat<Group> = makeStat(
    "autoNavigationPoints",
    "Auto Navigation Points",
    "Auto Nav",
    "Auto Navigation Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoNavigationPoints
);

export const AUTO_NAV_INDIVIDUAL_STAT: Stat<Group> = makeStat(
    "autoNavigationPointsIndividual",
    "Individual",
    "Auto Nav Individual",
    "Auto Navigation Points Individual",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoNavigationPointsIndividual
);

export const AUTO_REPOSITION_STAT: Stat<Group> = makeStat(
    "autoRepositioningPoints",
    "Auto Repositioning Points",
    "Auto Reposition",
    "Auto Repositioning Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoRepositioningPoints
);

export const AUTO_DELIVERY_STAT: Stat<Group> = makeStat(
    "autoDeliveryPoints",
    "Auto Delivery Points",
    "Auto Delivery",
    "Auto Delivery Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoDeliveryPoints
);

export const AUTO_PLACEMENT_STAT: Stat<Group> = makeStat(
    "autoPlacementPoints",
    "Auto Placement Points",
    "Auto Placement",
    "Auto Placement Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.AutoPlacementPoints
);

// ------------------------------------------------------------------------------------------------------------------------

export const DC_STAT: Stat<Group> = makeStat(
    "dcPoints",
    "Driver Controlled Points",
    "Teleop",
    "Driver Controlled Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.DriverControlledPoints
);

export const DC_DELIVERY_STAT: Stat<Group> = makeStat(
    "dcDeliveryPoints",
    "Delivery Points",
    "Delivery",
    "Driver Controlled Delivery Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.DcDeliveryPoints
);

export const DC_PLACEMENT_STAT: Stat<Group> = makeStat(
    "dcPlacementPoints",
    "Placement Points",
    "Placement",
    "Driver Controlled Placement Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.DcPlacementPoints
);

export const DC_SKYSCRAPER_STAT: Stat<Group> = makeStat(
    "dcSkyscraperBonusPoints",
    "Skyscraper Points",
    "Skyscraper",
    "Driver Controlled Skyscraper Bonus Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.DcSkyscraperPoints
);

// ------------------------------------------------------------------------------------------------------------------------

export const ENDGAME_STAT: Stat<Group> = makeStat(
    "endgamePoints",
    "Endgame Points",
    "Endgame",
    "Endgame Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.EndgamePoints
);

export const ENDGAME_CAPPING_STAT: Stat<Group> = makeStat(
    "cappingPoints",
    "Capping Points",
    "Capping",
    "Endgame Capping Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.CappingPoints
);

export const ENDGAME_CAPPING_INDIVIDUAL_STAT: Stat<Group> = makeStat(
    "cappingPointsIndividual",
    "Individual",
    "Capping Individual",
    "Endgame Capping Points Individual",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.CappingPointsIndividual
);

export const ENDGAME_PARKING_STAT: Stat<Group> = makeStat(
    "parkingPoints",
    "Parking Points",
    "Parking",
    "Endgame Parking Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.EndgameParkingPoints
);

export const ENDGAME_PARKING_INDIVIDUAL_STAT: Stat<Group> = makeStat(
    "parkingPointsIndividual",
    "Individual",
    "Parking Individual",
    "Endgame Parking Points Individual",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.EndgameParkingPointsIndividual
);

export const ENDGAME_FOUNDATION_STAT: Stat<Group> = makeStat(
    "foundationMovedPoints",
    "Foundation Moved Points",
    "Foundation Moved",
    "Endgame Foundation Moved Points",
    DisplayWhen.ALWAYS,
    Tep2019FieldName.FoundationMovedPoints
);

export let STAT_SET_TEAMS_2019: StatSet<FullTep2019, Group> = [
    {
        name: "Team's Event Performance",
        type: "standalone",
        set: {
            standalone: [
                TEAM_STAT,
                EVENT_RANK_STAT,
                RP_STAT,
                TBP_STAT,
                PLAYED_STAT,
                WINS_STAT,
                LOSSES_STAT,
                TIES_STAT,
                RECORD_STAT,
                DQ_STAT,
            ],
        },
    },
    {
        name: "Match Scores",
        type: "group",
        set: {
            groups: [
                {
                    longName: "Total",
                    shortName: "TOT",
                    description: "The sum of all points scored in the category.",
                    color: StatColor.RED,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.total }),
                            s,
                            StatColor.RED,
                            "TOT",
                            "Total",
                            "Total",
                            Tep2019Group.Total
                        ),
                },
                {
                    longName: "Average",
                    shortName: "AVG",
                    description: "The average number of points scored in the category.",
                    color: StatColor.PURPLE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.average }),
                            s,
                            StatColor.PURPLE,
                            "AVG",
                            "Average",
                            "Average",
                            Tep2019Group.Avg,
                            StatDisplayType.DECIMAL
                        ),
                },
                {
                    longName: "OPR",
                    shortName: "OPR",
                    description: "Offensive Power Rating.",
                    color: StatColor.PURPLE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.opr }),
                            s,
                            StatColor.PURPLE,
                            "OPR",
                            "OPR",
                            "OPR",
                            Tep2019Group.Opr,
                            StatDisplayType.DECIMAL
                        ),
                },
                {
                    longName: "Minimum",
                    shortName: "MIN",
                    description: "The lowest number of points scored in the category.",
                    color: StatColor.LIGHT_BLUE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.min }),
                            s,
                            StatColor.LIGHT_BLUE,
                            "MIN",
                            "Minimum",
                            "Minimum",
                            Tep2019Group.Min
                        ),
                },
                {
                    longName: "Maximum",
                    shortName: "MAX",
                    description: "The highest number of points scored in the category.",
                    color: StatColor.BLUE,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.max }),
                            s,
                            StatColor.BLUE,
                            "MAX",
                            "Maximum",
                            "Maximum",
                            Tep2019Group.Max
                        ),
                },
                {
                    longName: "Std. Dev.",
                    shortName: "DEV",
                    description: "The standard deviation of scores in the category.",
                    color: StatColor.GREEN,
                    get: (s) =>
                        groupGetter(
                            (t) => ({ ...t, data: t.data.stats.standardDev }),
                            s,
                            StatColor.GREEN,
                            "DEV",
                            "Std. Dev.",
                            "Standard Deviation",
                            Tep2019Group.Dev,
                            StatDisplayType.DECIMAL
                        ),
                },
            ],
            groupStats: [
                {
                    stat: TOTAL_STAT,
                    nestedStats: [],
                },
                {
                    stat: TOTAL_NP_STAT,
                    nestedStats: [],
                },
                {
                    stat: AUTO_STAT,
                    nestedStats: [
                        {
                            stat: AUTO_DELIVERY_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: AUTO_PLACEMENT_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: AUTO_REPOSITION_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: AUTO_NAV_STAT,
                            nestedStats: [
                                {
                                    stat: AUTO_NAV_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    stat: DC_STAT,
                    nestedStats: [
                        {
                            stat: DC_DELIVERY_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: DC_PLACEMENT_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: DC_SKYSCRAPER_STAT,
                            nestedStats: [],
                        },
                    ],
                },
                {
                    stat: ENDGAME_STAT,
                    nestedStats: [
                        {
                            stat: ENDGAME_CAPPING_STAT,
                            nestedStats: [
                                {
                                    stat: ENDGAME_CAPPING_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                        {
                            stat: ENDGAME_FOUNDATION_STAT,
                            nestedStats: [],
                        },
                        {
                            stat: ENDGAME_PARKING_STAT,
                            nestedStats: [
                                {
                                    stat: ENDGAME_PARKING_INDIVIDUAL_STAT,
                                    nestedStats: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    },
];

const SCORES = STAT_SET_TEAMS_2019.find((s) => s.name == "Match Scores")!.set as StatSetGroup<FullTep2019, Group>;
const AVG = SCORES.groups.find((g) => g.shortName == "AVG")!;
const MAX = SCORES.groups.find((g) => g.shortName == "MAX")!;
const OPR = SCORES.groups.find((g) => g.shortName == "OPR")!;

export const AVERAGE_STAT = AVG.get(TOTAL_STAT);
export const MAX_STAT = MAX.get(TOTAL_STAT);
export const OPR_STAT = OPR.get(TOTAL_STAT);
export const NP_OPR_STAT = OPR.get(TOTAL_NP_STAT);
export const AUTO_OPR_STAT = OPR.get(AUTO_STAT);
export const TELEOP_OPR_STAT = OPR.get(DC_STAT);
export const ENDGAME_OPR_STAT = OPR.get(ENDGAME_STAT);
