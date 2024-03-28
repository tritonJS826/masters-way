import { Client } from "pg";
import usersJson from "../../backups/users.bkp.json" assert { type: "json" };
import ways from "../../backups/ways.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, delay, firebaseDateToPgDate} from "../utils.js";
import {v4 as uuidv4} from "uuid";


const queryWayCollections = 'INSERT INTO way_collections(uuid, owner_uuid, created_at, updated_at, name, type) VALUES ($1, $2, $3, $4, $5, $6)';

const queryWayCollectionsWays  ='INSERT INTO way_collections_ways(way_collection_uuid, way_uuid) VALUES ($1, $2)'

const getWayIdByReportId = (dayReportId: string) => {
    const wayId = ways.find(way => (way.dayReportUuids as string[]).includes(dayReportId))?.uuid;
    return wayId as string;
};

export const wayCollections = async (client: Client) => {
    // 3 - 'own', 'favorite', 'mentoring'
    const wayCollectionAmount = usersJson.flatMap(w => w.customWayCollectionsStringified).length + 3 * usersJson.length
    usersJson.forEach(async (user) => {

        const ownValues = [
            uuidv4(),
            convertFirebaseUuidToPgUuid(user.uuid),
            firebaseDateToPgDate(user.createdAt),
            firebaseDateToPgDate(user.createdAt),
            'own',
            'own'
        ]
        const mentoringValues = [
            uuidv4(),
            convertFirebaseUuidToPgUuid(user.uuid),
            firebaseDateToPgDate(user.createdAt),
            firebaseDateToPgDate(user.createdAt),
            'mentoring',
            'mentoring'
        ]
        const favoriteValues = [
            uuidv4(),
            convertFirebaseUuidToPgUuid(user.uuid),
            firebaseDateToPgDate(user.createdAt),
            firebaseDateToPgDate(user.createdAt),
            'favorite',
            'favorite'
        ]
        const customValues = user.customWayCollectionsStringified.map(c => JSON.parse(c)).map(c => [
            c.id,
            convertFirebaseUuidToPgUuid(user.uuid),
            firebaseDateToPgDate(user.createdAt),
            firebaseDateToPgDate(user.createdAt),
            c.name,
            'custom'
        ]);

        client.query(queryWayCollections, ownValues, (err: any, result: any) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result way_collections:', result.rows);
            }
        });
        client.query(queryWayCollections, mentoringValues, (err: any, result: any) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result way_collections:', result.rows);
            }
        });
        client.query(queryWayCollections, favoriteValues, (err: any, result: any) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result way_collections:', result.rows);
            }
        });

        customValues.forEach(async values => {
            client.query(queryWayCollections, values, (err: any, result: any) => {
            if (err) {
                console.error('Error executing query', err);
            } else {
                console.log('Query result way_collections:', result.rows);
            }
        });
        });


        await delay(5_000);
        // way_collections_ways
        const ownCollectionUuid = ownValues[0]
        user.ownWayUuids.forEach(wayUuid => {
            const values = [
                ownCollectionUuid,
                convertFirebaseUuidToPgUuid(wayUuid),
            ]
            client.query(queryWayCollectionsWays, values,(err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result way_collections:', result.rows);
                }
            })
        });

        const favoriteCollectionUuid = favoriteValues[0]
        user.favoriteWayUuids.forEach(wayUuid => {
            const values = [
                favoriteCollectionUuid,
                convertFirebaseUuidToPgUuid(wayUuid),
            ]
            client.query(queryWayCollectionsWays, values,(err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result way_collections:', result.rows);
                }
            })
        });

        const mentoringCollectionUuid = mentoringValues[0]
        user.mentoringWayUuids.forEach(wayUuid => {
            const values = [
                mentoringCollectionUuid,
                convertFirebaseUuidToPgUuid(wayUuid),
            ]
            client.query(queryWayCollectionsWays, values,(err: any, result: any) => {
                if (err) {
                    console.error('Error executing query', err);
                } else {
                    console.log('Query result way_collections:', result.rows);
                }
            })
        });


        await delay(5_000);
        customValues.forEach(cvalues => {
            const customCollectionUuid = cvalues[0];
            const customWayUuids: string[] = user.customWayCollectionsStringified
                .map(c => JSON.parse(c) as any)
                .find((c: any) => c.id === customCollectionUuid)
                .wayUuids;
            
            customWayUuids.forEach((wayUuidRaw: string) => {
                const values = [
                    customCollectionUuid,
                    convertFirebaseUuidToPgUuid(wayUuidRaw)
                ];
                client.query(queryWayCollectionsWays, values,(err: any, result: any) => {
                    if (err) {
                        console.error('Error executing query', err);
                    } else {
                        console.log('Query result way_collections:', result.rows);
                    }
                })
            });
        });


        // console.log(`ERRORS is ok (REASON - some wayIds is undefined), BUT CHECK THE LENGTH IN POSTGRES - SHOULD BE ${wayCollectionAmount}`)

    });
};