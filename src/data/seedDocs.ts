import { DocumentMetadata } from '../types';

export const NECTA_FORM4_MATH_PAPERS_DATA: { year: number; paperNo?: string; fileId: string }[] = [
  { year: 2025, fileId: '1-QYU34U6qed2_G8UrL2KSdq3tZKbAvdS' },
  { year: 2024, fileId: '1G54c4x1Da-dyIo5jau6XEVx1r4nmHPNd' },
  { year: 2023, fileId: '1k_lPu2peSHL28SMBGiFmMvq8KrmcAGXp' },
  { year: 2022, fileId: '1puodyKKYXLbFgkXR1RmaCnp-VAgC6Ela' },
  { year: 2021, fileId: '16-VCvuv6H7miVJ5sXAAlzK0CqKBVCDxB' },
  { year: 2020, fileId: '1loIVcRhwkJq_eeT0_Li_sEg0HH3t2UxP' },
  { year: 2019, paperNo: 'Paper 1', fileId: '1zl8p-36-yAxzwC9RmQC-aaFAkEbvupRB' },
  { year: 2019, paperNo: 'Paper 2', fileId: '1uLZv1YNtCzOXmeLeRa68YDWhGq1En5Uu' },
  { year: 2018, fileId: '115dTxaz0kZdeWae1zqB2ax6ZQWSw9adH' },
  { year: 2017, fileId: '1nXt2L9qPjtw9kCpu0XKw5_CcUqPqG2uo' },
  { year: 2016, fileId: '1Rh9WEyiiujoixseoX7zLaM908Uf_a2rf' },
  { year: 2015, fileId: '1vKgXUse_bh38tsB03lqKa0uykaq13h-g' },
  { year: 2014, fileId: '1PVfWx9iy2aSQeiCdarRLt-lZBLPLYxp6' },
  { year: 2013, fileId: '14RbtOAwtnrw1TVSMeP-rBWPGcrXbt0m5' },
  { year: 2012, fileId: '1LMdQeRN6EMnr_OraWelDk6YgdxIKZKUF' },
  { year: 2011, fileId: '1CwWyuYAGdqKcX6UxaJmAAxg1cZpXGmwn' },
  { year: 2010, fileId: '1A6J7PXLWiHe6XX4-oXhXsoZqEdGDl8b4' },
  { year: 2009, fileId: '1FqoePY1UeVJc_4X8NnFIXtZ3BaFSaKJ2' },
  { year: 2008, fileId: '1qXL3-jwmec8pPfzn3DPvmYW9rpeODRWt' },
  { year: 2007, fileId: '1bQ_Qar8sCNAoC9SVGI20ZakjL1uB_VS1' },
  { year: 2006, fileId: '1osIYtC_xkqLp5BP7TAqkWdRfWB3jWiCK' },
  { year: 2005, fileId: '1HufivwSijRgFJ7czT7h-y5S2Sp_uB-D4' },
  { year: 2004, fileId: '12DY67jXrh1ygZYMIYoEgRgtbNFhlQR2S' },
  { year: 2003, fileId: '1t4JC6XsCC3BwPEH6KYhB4er9b8YHg3Nb' },
  { year: 2002, fileId: '1lx6Ln1ZvIDs9-BQTNVXJEZdxvpdKCHSj' },
  { year: 2001, fileId: '1Jqyc_AwQWeUQ1gBKRMFTqZjDL2Kxyez6' },
  { year: 2000, fileId: '1xDHOIxnsiQKW2UwfPgcX-QgWb3jcUY-A' },
  { year: 1999, fileId: '1zH0mvT1t2El0UyPZF8RiPq_MKGDpo1jV' },
  { year: 1998, fileId: '1T7YAbdunpzlObHSIHra8Jxwv11KAKLaN' },
  { year: 1997, fileId: '1lEMgUIblx-ldH0Cu2yKYvIHLQmwvP2G-' },
  { year: 1996, fileId: '19nAji5mqsoXQlY2eIxqpaX5g8ksWYNwL' },
  { year: 1995, fileId: '1WAKZNX-oZV8TWhMheNPi-BeKndX5MpNs' },
  { year: 1994, fileId: '1q2rmwfiOaqbayvLYOHRfy5Lb2Ewxd-fM' },
];

const generatedDocs: DocumentMetadata[] = [];

NECTA_FORM4_MATH_PAPERS_DATA.forEach((paper) => {
  const paperSuffix = paper.paperNo ? ` (${paper.paperNo})` : '';
  const paperSlug = paper.paperNo ? `-${paper.paperNo.toLowerCase().replace(/\s+/g, '')}` : '';
  
  const baseDoc: DocumentMetadata = {
    id: `necta-f4-basic-math-${paper.year}${paperSlug}`,
    title: `NECTA Form 4 Basic Mathematics${paperSuffix} - ${paper.year}`,
    description: `Mtihani wa Taifa wa Kidato cha Nne (CSEE) - Hisabati ya Kawaida (Basic Mathematics${paperSuffix}) wa Mwaka ${paper.year}. Karatasi rasmi ya NECTA kwa ajili ya mazoezi, marudio na maandalizi ya mitihani.`,
    category: 'Mathematics',
    subject: 'Basic Mathematics',
    tags: ['NECTA', 'CSEE', 'Basic Mathematics', 'basic-math', 'mathematics', 'Hisabati', 'Past Papers', 'Kidato cha Nne', 'Form 4', 'f4', String(paper.year), paper.paperNo || 'Paper 1'],
    fileId: paper.fileId,
    driveUrl: `https://drive.google.com/file/d/${paper.fileId}/preview`,
    uploadedBy: 'system',
    uploadedByName: 'Baraza la Mitihani la Tanzania (NECTA)',
    createdAt: Date.now() - (2026 - paper.year) * 86400000 * 30,
    views: 1200 + (2026 - paper.year) * 150,
    status: 'approved',
    downloadsCount: 450 + (2026 - paper.year) * 80,
    rating: 4.9,
    type: 'NECTA',
    paperNo: paper.paperNo || 'Paper 1',
    year: paper.year,
    sizeKB: 320
  };

  generatedDocs.push(baseDoc);

  // Add standard alias ID without paperNo suffix if Paper 1 or default
  if (paper.paperNo === 'Paper 1' || !paper.paperNo) {
    const aliasDoc = {
      ...baseDoc,
      id: `necta-f4-basic-math-${paper.year}`
    };
    generatedDocs.push(aliasDoc);
  }
});

export const nectaMathDocs: DocumentMetadata[] = generatedDocs;
export const localSeedDocs: DocumentMetadata[] = [...nectaMathDocs];



