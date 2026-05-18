import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { FamilyFormalGroup, ShotListItem, Studio, TimelineItem, WeddingProject } from "@prisma/client";

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, color: "#1c1917" },
  header: { borderBottom: "2px solid #0f766e", paddingBottom: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700 },
  h2: { fontSize: 14, fontWeight: 700, marginTop: 12, marginBottom: 6 },
  row: { paddingVertical: 4, borderBottom: "1px solid #e7e5e4" },
  muted: { color: "#57534e" },
});

export function ProductionBriefPdf({ project, studio, timeline, shots, formals, type }: { project: WeddingProject; studio: Studio; timeline: TimelineItem[]; shots: ShotListItem[]; formals: FamilyFormalGroup[]; type: string }) {
  const watermark = "Sample export - upgrade removes watermark";
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{project.coupleName1} + {project.coupleName2}</Text>
          <Text style={styles.muted}>{studio.name} · {project.venueName || "Venue pending"}</Text>
          <Text style={styles.muted}>{type}</Text>
        </View>
        <Text style={styles.h2}>Timeline</Text>
        {timeline.map((item) => <Text key={item.id} style={styles.row}>{item.time} · {item.title} · {item.location || ""}</Text>)}
        <Text style={styles.h2}>Shot List</Text>
        {shots.map((item) => <Text key={item.id} style={styles.row}>{item.section}: {item.label}{item.isMustHave ? " (must-have)" : ""}</Text>)}
        <Text style={styles.h2}>Family Formals</Text>
        {formals.map((item) => <Text key={item.id} style={styles.row}>{item.label}: {item.people}</Text>)}
        <Text style={[styles.muted, { marginTop: 18 }]}>{watermark}</Text>
      </Page>
    </Document>
  );
}
