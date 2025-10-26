import { Season } from "../../Season";
import { Descriptor, DescriptorColumn } from "../descriptor";
import { BoolDTy, EnumDTy, Int16DTy, listTy, nn } from "../types";
import { Station } from "../../Station";
import { nOf } from "../../../utils/format/n-of";
import {
    AllianceScores2025TradFtcApi,
    ApiArtifactType,
} from "../../../ftc-api-types/match-scores/MatchScores2025Trad";
import { GraphQLObjectType } from "graphql";

export const DCPark = {
    Full: "Full",
    Partial: "Partial",
    None: "None",
} as const;
export type DCPark = (typeof DCPark)[keyof typeof DCPark];
const DCParkDTy = EnumDTy(DCPark, "DCPark", "dc_park_enum");

function parkFromApi(api: AllianceScores2025TradFtcApi["robot1Teleop"]): DCPark {
    switch (api) {
        case "FULL":
            return DCPark.Full;
        case "PARTIAL":
            return DCPark.Partial;
        case "NONE":
            return DCPark.None;
    }
}
// TODO: 10 point bonus if both robots parked
function parkPoints(park: DCPark): number {
    switch (park) {
        case "Full":
            return 10;
        case "Partial":
            return 5;
        case "None":
            return 0;
    }
}

export const ArtifactType = {
    None: "None",
    Purple: "Purple",
    Green: "Green",
} as const;
export type ArtifactType = (typeof ArtifactType)[keyof typeof ArtifactType];
const ArtifactTypeDTY = EnumDTy(ArtifactType, "ArtifactType", "artifact_type_enum");

function artifactTypeFromApi(artifactType: ApiArtifactType): ArtifactType {
    switch (artifactType) {
        case "NONE":
            return ArtifactType.None;
        case "PURPLE":
            return ArtifactType.Purple;
        case "GREEN":
            return ArtifactType.Green;
    }
}

function ClassifierStateFromApi(api: ApiArtifactType[]): ArtifactType[] {
    let classifier: ArtifactType[] = [];
    for (const artifact of api) {
        classifier.push(artifactTypeFromApi(artifact));
    }
    return classifier;
}

let classifierStateGQL = new GraphQLObjectType({
    name: "ClassifierState",
    fields: {
        artifacts: listTy({ type: nn(ArtifactTypeDTY.gql) }),
    },
});

type Api = AllianceScores2025TradFtcApi;

export const Descriptor2025 = new Descriptor({
    season: Season.Decode,
    seasonName: "Decode",
    hasRemote: false,
    hasEndgame: false,
    pensSubtract: false,
    rankings: {
        rp: "RankingPoints",
        tb: "AverageNP",
    },
    firstDate: new Date("2025-09-06"),
    lastDate: new Date("2026-09-04"),
    kickoff: new Date("2025-09-06"),
})
    .addColumn(
        new DescriptorColumn({ name: "autoLeave1" })
            .addMatchScore({
                fromApi: (api: Api) => api.robot1Auto,
                dataTy: BoolDTy,
            })
            .addScoreModal({
                displayName: "Robot 1",
                columnPrefix: "Auto Leave 1",
                fullName: "Robot 1 Auto Leave Points",
                getValue: (ms) => parkPoints(ms.autoPark1),
                getTitle: (ms) => ms.autoPark1, // TODO should this be formatted?
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoLeave2" })
            .addMatchScore({
                fromApi: (api: Api) => api.robot2Auto,
                dataTy: BoolDTy,
            })
            .addScoreModal({
                displayName: "Robot 2",
                columnPrefix: "Auto Leave 2",
                fullName: "Robot 2 Auto Leave Points",
                getValue: (ms) => parkPoints(ms.autoPark2),
                getTitle: (ms) => ms.autoPark2, // TODO should this be formatted?
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoClassifiedArtifacts" }).addMatchScore({
            fromApi: (api: Api) => api.autoClassifiedArtifacts,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoOverflowArtifacts" }).addMatchScore({
            fromApi: (api: Api) => api.autoOverflowArtifacts,
            dataTy: Int16DTy,
        })
    )
    .addC.addColumn(
        new DescriptorColumn({ name: "autoSampleHigh" }).addMatchScore({
            fromApi: (api: Api) => api.autoSampleHigh,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSpecimenLow" }).addMatchScore({
            fromApi: (api: Api) => api.autoSpecimenLow,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSpecimenHigh" }).addMatchScore({
            fromApi: (api: Api) => api.autoSpecimenHigh,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcPark1" })
            .addMatchScore({
                fromApi: (api: Api) => parkFromApi(api.robot1Teleop),
                dataTy: ITDParkDTy,
            })
            .addScoreModal({
                displayName: "Robot 1",
                columnPrefix: "DC Park 1",
                fullName: "Robot 1 Teleop Parking Points",
                getValue: (ms) => parkPoints(ms.dcPark1),
                getTitle: (ms) => formatPark(ms.dcPark1),
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcPark2" })
            .addMatchScore({
                fromApi: (api: Api) => parkFromApi(api.robot2Teleop),
                dataTy: ITDParkDTy,
            })
            .addScoreModal({
                displayName: "Robot 2",
                columnPrefix: "DC Park 2",
                fullName: "Robot 2 Teleop Parking Points",
                getValue: (ms) => parkPoints(ms.dcPark2),
                getTitle: (ms) => formatPark(ms.dcPark2),
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleNet" }).addMatchScore({
            fromApi: (api: Api) => api.teleopSampleNet,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleLow" }).addMatchScore({
            fromApi: (api: Api) => api.teleopSampleLow,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleHigh" }).addMatchScore({
            fromApi: (api: Api) => api.teleopSampleHigh,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSpecimenLow" }).addMatchScore({
            fromApi: (api: Api) => api.teleopSpecimenLow,
            dataTy: Int16DTy,
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSpecimenHigh" }).addMatchScore({
            fromApi: (api: Api) => api.teleopSpecimenHigh,
            dataTy: Int16DTy,
        })
    )

    .addColumn(
        new DescriptorColumn({ name: "minorsCommitted" })
            .addMatchScore({
                fromApi: (api: Api) => api.minorFouls,
                dataTy: Int16DTy,
            })
            .finish()
    )
    .addColumn(
        new DescriptorColumn({ name: "majorsCommitted" })
            .addMatchScore({
                fromApi: (api: Api) => api.majorFouls,
                dataTy: Int16DTy,
            })
            .finish()
    )
    .addColumn(
        new DescriptorColumn({ name: "minorsByOpp" })
            .addMatchScore({
                fromApi: (_, api: Api) => api.minorFouls,
                dataTy: Int16DTy,
            })
            .finish()
    )
    .addColumn(
        new DescriptorColumn({ name: "majorsByOpp" })
            .addMatchScore({
                fromApi: (_, api: Api) => api.majorFouls,
                dataTy: Int16DTy,
            })
            .finish()
    )

    .addColumn(
        new DescriptorColumn({ name: "autoParkPoints" })
            .addMatchScore({
                fromSelf: (self) => parkPoints(self.autoPark1) + parkPoints(self.autoPark2),
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Parking Points",
                columnPrefix: "Auto Park",
                fullName: "Auto Parking Points",
            })
            .addTep({ columnPrefix: "Auto Park", fullName: "Auto Parking Points" })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoParkPointsIndividual" }).addTep({
            isIndividual: true,
            make: (ms, station) => parkPoints(station == Station.One ? ms.autoPark1 : ms.autoPark2),
            columnPrefix: "Auto Park Individual",
            dialogName: "Individual",
            fullName: "Auto Parking Points Individual",
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSamplePoints" })
            .addMatchScore({
                fromSelf: (self) =>
                    self.autoSampleNet * 2 + self.autoSampleLow * 4 + self.autoSampleHigh * 8,
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Sample Points",
                columnPrefix: "Auto Sample",
                fullName: "Auto Sample Points",
            })
            .addTep({
                columnPrefix: "Auto Sample",
                dialogName: "Sample Points",
                fullName: "Auto Sample Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSpecimenPoints" })
            .addMatchScore({
                fromSelf: (self) => self.autoSpecimenLow * 6 + self.autoSpecimenHigh * 10,
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Specimen Points",
                columnPrefix: "Auto Specimen",
                fullName: "Auto Specimen Points",
            })
            .addTep({
                columnPrefix: "Auto Specimen",
                dialogName: "Specimen Points",
                fullName: "Auto Specimen Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSampleNetPoints" })
            .addScoreModal({
                displayName: "Net",
                columnPrefix: "Auto Sample Net",
                fullName: "Auto Sample Net Points",
                sql: (ms) => `(${ms}.autoSampleNet * 2)`,
                getValue: (ms) => ms.autoSampleNet * 2,
                getTitle: (ms) => nOf(ms.autoSampleNet, "Sample"),
            })
            .addTep({
                make: (ms) => ms.autoSampleNet * 2,
                columnPrefix: "Auto Sample Net",
                fullName: "Auto Sample Net Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSampleLowPoints" })
            .addScoreModal({
                displayName: "Low",
                columnPrefix: "Auto Sample Low",
                fullName: "Auto Sample Low Points",
                sql: (ms) => `(${ms}.autoSampleLow * 4)`,
                getValue: (ms) => ms.autoSampleLow * 4,
                getTitle: (ms) => nOf(ms.autoSampleLow, "Sample"),
            })
            .addTep({
                make: (ms) => ms.autoSampleLow * 4,
                columnPrefix: "Auto Sample Low",
                fullName: "Auto Sample Low Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSampleHighPoints" })
            .addScoreModal({
                displayName: "High",
                columnPrefix: "Auto Sample High",
                fullName: "Auto Sample High Points",
                sql: (ms) => `(${ms}.autoSampleHigh * 8)`,
                getValue: (ms) => ms.autoSampleHigh * 8,
                getTitle: (ms) => nOf(ms.autoSampleHigh, "Sample"),
            })
            .addTep({
                make: (ms) => ms.autoSampleHigh * 8,
                columnPrefix: "Auto Sample High",
                fullName: "Auto Sample High Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSpecimenLowPoints" })
            .addScoreModal({
                displayName: "Low",
                columnPrefix: "Auto Specimen Low",
                fullName: "Auto Specimen Low Points",
                sql: (ms) => `(${ms}.autoSpecimenLow * 6)`,
                getValue: (ms) => ms.autoSpecimenLow * 6,
                getTitle: (ms) => nOf(ms.autoSpecimenLow, "Specimen"),
            })
            .addTep({
                make: (ms) => ms.autoSpecimenLow * 6,
                columnPrefix: "Auto Specimen Low",
                fullName: "Auto Specimen Low Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "autoSpecimenHighPoints" })
            .addScoreModal({
                displayName: "High",
                columnPrefix: "Auto Specimen High",
                fullName: "Auto Specimen High Points",
                sql: (ms) => `(${ms}.autoSpecimenHigh * 10)`,
                getValue: (ms) => ms.autoSpecimenHigh * 10,
                getTitle: (ms) => nOf(ms.autoSpecimenHigh, "Specimen"),
            })
            .addTep({
                make: (ms) => ms.autoSpecimenHigh * 10,
                columnPrefix: "Auto Specimen High",
                fullName: "Auto Specimen High Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcParkPoints" })
            .addMatchScore({
                fromSelf: (self) => parkPoints(self.dcPark1) + parkPoints(self.dcPark2),
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Parking Points",
                columnPrefix: "DC Park",
                fullName: "DC Parking Points",
            })
            .addTep({ columnPrefix: "DC Park", fullName: "DC Parking Points" })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcParkPointsIndividual" }).addTep({
            isIndividual: true,
            make: (ms, station) => parkPoints(station == Station.One ? ms.dcPark1 : ms.dcPark2),
            columnPrefix: "DC Park Individual",
            dialogName: "Individual",
            fullName: "DC Parking Points Individual",
        })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSamplePoints" })
            .addMatchScore({
                fromSelf: (self) =>
                    self.dcSampleNet * 2 + self.dcSampleLow * 4 + self.dcSampleHigh * 8,
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Sample Points",
                columnPrefix: "DC Sample",
                fullName: "DC Sample Points",
            })
            .addTep({
                columnPrefix: "DC Sample",
                dialogName: "Sample Points",
                fullName: "DC Sample Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSpecimenPoints" })
            .addMatchScore({
                fromSelf: (self) => self.dcSpecimenLow * 6 + self.dcSpecimenHigh * 10,
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Specimen Points",
                columnPrefix: "DC Specimen",
                fullName: "DC Specimen Points",
            })
            .addTep({
                columnPrefix: "DC Specimen",
                dialogName: "Specimen Points",
                fullName: "DC Specimen Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleNetPoints" })
            .addScoreModal({
                displayName: "Net",
                columnPrefix: "DC Sample Net",
                fullName: "DC Sample Net Points",
                sql: (ms) => `(${ms}.dcSampleNet * 2)`,
                getValue: (ms) => ms.dcSampleNet * 2,
                getTitle: (ms) => nOf(ms.dcSampleNet, "Sample"),
            })
            .addTep({
                make: (ms) => ms.dcSampleNet * 2,
                columnPrefix: "DC Sample Net",
                fullName: "DC Sample Net Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleLowPoints" })
            .addScoreModal({
                displayName: "Low",
                columnPrefix: "DC Sample Low",
                fullName: "DC Sample Low Points",
                sql: (ms) => `(${ms}.dcSampleLow * 4)`,
                getValue: (ms) => ms.dcSampleLow * 4,
                getTitle: (ms) => nOf(ms.dcSampleLow, "Sample"),
            })
            .addTep({
                make: (ms) => ms.dcSampleLow * 4,
                columnPrefix: "DC Sample Low",
                fullName: "DC Sample Low Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSampleHighPoints" })
            .addScoreModal({
                displayName: "High",
                columnPrefix: "DC Sample High",
                fullName: "DC Sample High Points",
                sql: (ms) => `(${ms}.dcSampleHigh * 8)`,
                getValue: (ms) => ms.dcSampleHigh * 8,
                getTitle: (ms) => nOf(ms.dcSampleHigh, "Sample"),
            })
            .addTep({
                make: (ms) => ms.dcSampleHigh * 8,
                columnPrefix: "DC Sample High",
                fullName: "DC Sample High Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSpecimenLowPoints" })
            .addScoreModal({
                displayName: "Low",
                columnPrefix: "DC Specimen Low",
                fullName: "DC Specimen Low Points",
                sql: (ms) => `(${ms}.dcSpecimenLow * 6)`,
                getValue: (ms) => ms.dcSpecimenLow * 6,
                getTitle: (ms) => nOf(ms.dcSpecimenLow, "Specimen"),
            })
            .addTep({
                make: (ms) => ms.dcSpecimenLow * 6,
                columnPrefix: "DC Specimen Low",
                fullName: "DC Specimen Low Points",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcSpecimenHighPoints" })
            .addScoreModal({
                displayName: "High",
                columnPrefix: "DC Specimen High",
                fullName: "DC Specimen High Points",
                sql: (ms) => `(${ms}.dcSpecimenHigh * 10)`,
                getValue: (ms) => ms.dcSpecimenHigh * 10,
                getTitle: (ms) => nOf(ms.dcSpecimenHigh, "Specimen"),
            })
            .addTep({
                make: (ms) => ms.dcSpecimenHigh * 10,
                columnPrefix: "DC Specimen High",
                fullName: "DC Specimen High Points",
            })
    )

    .addColumn(
        new DescriptorColumn({ name: "autoPoints" })
            .addMatchScore({
                fromSelf: (self) =>
                    self.autoParkPoints + self.autoSamplePoints + self.autoSpecimenPoints,
                dataTy: Int16DTy,
            })
            .addScoreModal({ displayName: "Auto", columnPrefix: "Auto", fullName: "Auto Points" })
            .addTep({ columnPrefix: "Auto", dialogName: "Auto Points", fullName: "Auto Points" })
    )
    .addColumn(
        new DescriptorColumn({ name: "dcPoints" })
            .addMatchScore({
                fromSelf: (self) => self.dcParkPoints + self.dcSamplePoints + self.dcSpecimenPoints,
                dataTy: Int16DTy,
            })
            .addScoreModal({
                displayName: "Driver-Controlled",
                columnPrefix: "Teleop",
                fullName: "Teleop Points",
            })
            .addTep({
                columnPrefix: "Teleop",
                dialogName: "Teleop Points",
                fullName: "Teleop Points",
            })
    )

    .addColumn(
        new DescriptorColumn({ name: "majorsCommittedPoints" })
            .addScoreModal({
                displayName: "Majors Points",
                columnPrefix: "Majors",
                fullName: "Major Penalty Points Committed",
                sql: (ms) => `(${ms}.majorsCommitted * 15)`,
                getValue: (ms) => ms.majorsCommitted * 15,
                getTitle: (ms) => nOf(ms.majorsCommitted, "Major Committed", "Majors Committed"),
            })
            .addTep({
                make: (ms) => ms.majorsCommitted * 15,
                columnPrefix: "Majors Committed",
                dialogName: "Majors",
                fullName: "Major Penalty Points Committed",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "minorsCommittedPoints" })
            .addScoreModal({
                displayName: "Minors Points",
                columnPrefix: "Minors",
                fullName: "Minor Penalty Points Committed",
                sql: (ms) => `(${ms}.minorsCommitted * 5)`,
                getValue: (ms) => ms.minorsCommitted * 5,
                getTitle: (ms) => nOf(ms.minorsCommitted, "Minor Committed", "Minors Committed"),
            })
            .addTep({
                make: (ms) => ms.minorsCommitted * 5,
                columnPrefix: "Minors Committed",
                dialogName: "Minors",
                fullName: "Minor Penalty Points Committed",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "penaltyPointsCommitted" })
            .addMatchScore({
                fromSelf: (self) => self.majorsCommitted * 15 + self.minorsCommitted * 5,

                dataTy: Int16DTy,
            })
            .addTep({
                columnPrefix: "Penalties Committed",
                dialogName: "Penalty Points",
                fullName: "Penalty Points Committed",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "majorsByOppPoints" })
            .addTep({
                make: (ms) => ms.majorsByOpp * 15,
                columnPrefix: "Opp Majors Committed",
                dialogName: "Majors",
                fullName: "Major Penalty Points by Opponent",
            })
            .finish()
    )
    .addColumn(
        new DescriptorColumn({ name: "minorsByOppPoints" })
            .addTep({
                make: (ms) => ms.minorsByOpp * 5,
                columnPrefix: "Opp Minors Committed",
                dialogName: "Minors",
                fullName: "Minor Penalty Points by Opponent",
            })
            .finish()
    )
    .addColumn(
        new DescriptorColumn({ name: "penaltyPointsByOpp" })
            .addMatchScore({
                fromSelf: (self) => self.majorsByOpp * 15 + self.minorsByOpp * 5,

                dataTy: Int16DTy,
            })
            .addTep({
                columnPrefix: "Opp Penalties Committed",
                dialogName: "Opp Penalty Points",
                fullName: "Penalty Points by Opponent",
            })
            .addScoreModal({
                displayName: "Penalties",
                columnPrefix: "Penalties",
                fullName: "Penalty Points By Opponent",
            })
    )

    .addColumn(
        new DescriptorColumn({ name: "totalPointsNp" })
            .addMatchScore({
                fromSelf: (self) => self.autoPoints + self.dcPoints,
                dataTy: Int16DTy,
            })
            .addTep({
                columnPrefix: "np",
                dialogName: "Total Points NP",
                fullName: "Total Points No Penalties",
            })
    )
    .addColumn(
        new DescriptorColumn({ name: "totalPoints" })
            .addMatchScore({
                fromSelf: (self) => self.totalPointsNp + self.penaltyPointsByOpp,
                dataTy: Int16DTy,
            })
            .addTep({ columnPrefix: "", dialogName: "Total Points", fullName: "Total Points" })
    )

    .addTree([
        { val: "totalPoints", children: [] },
        { val: "totalPointsNp", children: [] },
        {
            val: "autoPoints",
            children: [
                {
                    val: "autoParkPoints",
                    children: [
                        { val: "autoPark1", children: [] },
                        { val: "autoPark2", children: [] },
                        { val: "autoParkPointsIndividual", children: [] },
                    ],
                },
                {
                    val: "autoSamplePoints",
                    children: [
                        { val: "autoSampleNetPoints", children: [] },
                        { val: "autoSampleLowPoints", children: [] },
                        { val: "autoSampleHighPoints", children: [] },
                    ],
                },
                {
                    val: "autoSpecimenPoints",
                    children: [
                        { val: "autoSpecimenLowPoints", children: [] },
                        { val: "autoSpecimenHighPoints", children: [] },
                    ],
                },
            ],
        },
        {
            val: "dcPoints",
            children: [
                {
                    val: "dcParkPoints",
                    children: [
                        { val: "dcPark1", children: [] },
                        { val: "dcPark2", children: [] },
                        { val: "dcParkPointsIndividual", children: [] },
                    ],
                },
                {
                    val: "dcSamplePoints",
                    children: [
                        { val: "dcSampleNetPoints", children: [] },
                        { val: "dcSampleLowPoints", children: [] },
                        { val: "dcSampleHighPoints", children: [] },
                    ],
                },
                {
                    val: "dcSpecimenPoints",
                    children: [
                        { val: "dcSpecimenLowPoints", children: [] },
                        { val: "dcSpecimenHighPoints", children: [] },
                    ],
                },
            ],
        },
        {
            val: "penaltyPointsCommitted",
            children: [
                { val: "majorsCommittedPoints", children: [] },
                { val: "minorsCommittedPoints", children: [] },
            ],
        },
        {
            val: "penaltyPointsByOpp",
            children: [
                { val: "majorsCommittedPoints", for: "sm", children: [] },
                { val: "minorsCommittedPoints", for: "sm", children: [] },
                { val: "majorsByOppPoints", for: "tep", children: [] },
                { val: "minorsByOppPoints", for: "tep", children: [] },
            ],
        },
    ])
    .addMatchInsightCols(
        ["autoSamplePoints", "autoSpecimenPoints", "dcSamplePoints", "dcSpecimenPoints"],
        ["autoSamplePoints", "autoSpecimenPoints", "dcSamplePoints", "dcSpecimenPoints"]
    )
    .finish();
