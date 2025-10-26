export type ApiArtifactType = "NONE" | "PURPLE" | "GREEN";

// TODO: get randomization, its a match level attribute
export interface AllianceScores2025TradFtcApi {
    alliance: "Blue" | "Red";
    team: number;
    autoClassifiedArtifacts: number;
    autoOverflowArtifacts: number;
    autoClassifierState: ApiArtifactType[];
    robot1Auto: boolean;
    robot2Auto: boolean;
    autoLeavePoints: number;
    autoArtifactPoints: number;
    autoPatternPoints: number;
    teleopClassifiedArtifacts: number;
    teleopOverflowArtifacts: number;
    teleopDepotArtifacts: number;
    teleopClassiferState: ApiArtifactType[];
    robot1Teleop: "FULL" | "PARTIAL" | "NONE";
    robot2Teleop: "FULL" | "PARTIAL" | "NONE";
    teleopArtifactPoints: number;
    teleopDepotPoints: number;
    teleopPatternPoints: number;
    teleopBasePoints: number;
    autoPoints: number;
    teleopPoints: number;
    foulPointsCommitted: number;
    preFoulTotal: number;
    movementRP: boolean;
    goalRP: boolean;
    patternRP: boolean;
    totalPoints: number;
    majorFouls: number;
    minorFouls: number;
}
