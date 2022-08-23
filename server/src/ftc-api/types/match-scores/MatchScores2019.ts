export interface MatchScores2019FtcApi {
    matchLevel: "OTHER" | "QUALIFICATION" | "SEMIFINAL" | "FINAL" | "PLAYOFF";
    matchSeries: number;
    matchNumber: number;
    alliances: AllianceScores2019FtcApi[];
}

export interface AllianceScores2019FtcApi {
    alliance: "Blue" | "Red";
    robot1Navigated: boolean;
    robot1Parked: boolean;
    robot1CapstoneLevel: number;
    robot2Navigated: boolean;
    robot2Parked: boolean;
    robot2CapstoneLevel: number;
    autoStones: ("NONE" | "STONE" | "SKYSTONE")[];
    autoDelivered: number;
    autoReturned: number;
    firstReturnedIsSkystone: boolean;
    autoPlaced: number;
    foundationRepositioned: boolean;
    foundationMoved: boolean;
    driverControlledDelivered: number;
    driverControlledReturned: number;
    driverControlledPlaced: number;
    tallestSkyscraper: number;
    autoDeliveryPoints: number;
    autoPlacedPoints: number;
    autonomousPoints: number;
    repositionedPoints: number;
    navigationPoints: number;
    driverControlledDeliveryPoints: number;
    driverControlledPlacedPoints: number;
    skyscraperBonusPoints: number;
    capstonePoints: number;
    driverControlledPoints: number;
    parkingPoints: number;
    endGamePoints: number;
    minorPenalties: number;
    majorPenalties: number;
    penaltyPoints: number;
    totalPoints: number;
}
