import { db } from '../connection';

export async function countUnits(unitCode: string): Promise<number> {
  const result = await db.query(
    `
      SELECT COUNT(*) AS count
      FROM public.don_vi
      WHERE ma_don_vi = $1 AND is_deleted = false
    `,
    [unitCode]
  );

  const count = Number(result.rows[0].count);
  return count;
}
export async function isUnitExists(unitCode: string): Promise<boolean> {
  const result = await db.query(
    `SELECT COUNT(*) AS count
     FROM public.don_vi
     WHERE ma_don_vi = $1 AND is_deleted = false`,
    [unitCode]
  );
  return Number(result.rows[0].count) > 0;
}
export async function getExistingUnitCodes(unitCodes: string[]): Promise<string[]> {
  const result = await db.query(
    `SELECT ma_don_vi
     FROM public.don_vi
     WHERE ma_don_vi = ANY($1)
       AND is_deleted = false`,
    [unitCodes]
  );

  return result.rows.map(row => row.ma_don_vi);
}
export async function getUnitParentCode(
  unitCode: string
): Promise<string | null> {
  const result = await db.query(
    `SELECT parent.ma_don_vi AS parent_code
     FROM public.don_vi child
     LEFT JOIN public.don_vi parent
       ON parent.id = CAST(
         split_part(child.duong_dan_id, ';', array_length(string_to_array(child.duong_dan_id, ';'), 1) - 1)
         AS BIGINT
       )
      AND parent.is_deleted = false
     WHERE child.ma_don_vi = $1
       AND child.is_deleted = false`,
    [unitCode]
  );

  return result.rows[0]?.parent_code ?? null;
}