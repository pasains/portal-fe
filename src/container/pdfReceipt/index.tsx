import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFViewer,
  StyleSheet,
} from "@react-pdf/renderer";
import { useItemDetail } from "../../hooks/item/itemDetail";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    padding: "30px 50px",
  },
  header: {
    justifyContent: "space-between",
    marginBottom: 106,
    flexDirection: "row",
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  list: {
    fontSize: 12,
    marginVertical: 5,
    marginTop: 5,
    fontFamily: "Helvetica-Bold",
  },
  textBold: {
    fontFamily: "Helvetica-Bold",
  },
  tableHeader: {
    backgroundColor: "#e5e5e5",
  },
  row: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 12,
    marginBottom: 5,
  },
  labelColumn: {
    width: "20%", // Lebar kolom label
    textAlign: "left",
  },
  colonColumn: {
    width: "5%", // Lebar kolom untuk titik dua
    textAlign: "center",
  },
  valueColumn: {
    width: "50%", // Lebar kolom nilai
    textAlign: "left",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    marginTop: 5,
  },
  spaceY: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    fontSize: 11,
    fontFamily: "Helvetica",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderRightColor: "#000",
    borderBottomColor: "#000",
    textAlign: "center",
  },
  tableCellLast: {
    borderRightWidth: 1,
  },
  headerCell: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#eaeaea", // Latar belakang untuk header
  },
  image: {
    position: "absolute", // Position it absolutely on the page
    width: 500, // Set width for the logo
    height: 99, // Set height for the logo
    objectFit: "cover",
  },
});
const tableHead = [
  { titleHead: "Inventory Name", accessor: "inventoryName" },
  { titleHead: "Reference Id", accessor: "refId" },
  { titleHead: "Inventory Group Name", accessor: "inventoryGroupName" },
  { titleHead: "Quantity", accessor: "quantity" },
  { titleHead: "Description", accessor: "description" },
  { titleHead: "Condition", accessor: "preCondition" },
];

export default function ReceiptDownload() {
  const { borrowingDetail, item } = useItemDetail();
  console.log(item);
  const ReceiptPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            src="https://media-hosting.imagekit.io//18df62500e294185/kop1.jpg?Expires=1831709392&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ijpb7wk-bJyz4GuIXUHR~gFpja2u9DCyAvalY6SzEBV7JBMdXpr~~33f6-ljGBzAVfUFGYGBggZsSHZpFUp8Csw1Y2DpRr6mWRMi3AvNMc72WZDpvkrQDWUj~eyCJl721KW-0ac5CK-L92xltbnKoGiAoiqDqjz7NFgcpVDf70XZ0IdZ3akEj9pmVHq-4DI4XzHxXoDAHLriRVlRKfF0l40XAa23aT39mQptp5Tjk4M7OeKP3qJDx1CHMlhfqhIiG8PC-K~3rZyQJ1flWsHGmgCX5KXWc-SpvV0l9PwuUenfHxDtxsSO54cMxEvx-9Lqc1jbOyb3KsDui3v8TpqmwQ__"
          />
        </View>
        <View style={styles.spaceY}>
          <Text>Invoice #: {borrowingDetail.invoiceNumber}</Text>
          <Text>
            {borrowingDetail.createdAt
              ? new Intl.DateTimeFormat("en-US", {
                  formatMatcher: "best fit",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(borrowingDetail.createdAt))
              : "Invalid Date"}
          </Text>
        </View>

        <Text style={[styles.title, styles.textBold]}>Borrowing Details</Text>
        <View>
          {[
            {
              label: "Name",
              value: borrowingDetail.borrowerName.toUpperCase(),
            },
            {
              label: "Organization",
              value: borrowingDetail.organizationName.toUpperCase(),
            },
            { label: "Address", value: borrowingDetail.address },
            { label: "Phone Number", value: borrowingDetail.phoneNumber },
            { label: "Identity Card", value: borrowingDetail.identityCard },
            { label: "Identity Number", value: borrowingDetail.identityNumber },
            {
              label: "Due Date",
              value: borrowingDetail.dueDate
                ? (() => {
                    const date = new Date(borrowingDetail.dueDate);
                    const daysOfWeek = [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ];
                    const weekday = daysOfWeek[date.getDay()];
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();

                    return `${weekday}, ${day}-${month}-${year}`;
                  })()
                : "Invalid Date",
            },
          ].map((item: any, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.labelColumn}>{item.label}</Text>
              <Text style={styles.colonColumn}>:</Text>
              <Text style={styles.valueColumn}>{item.value || "-"}</Text>
            </View>
          ))}
        </View>

        {/* Render the table */}
        <Text style={styles.list}>List of items :</Text>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            {tableHead.map((head) => (
              <View
                key={head.accessor}
                style={[styles.tableCell, styles.headerCell]}
              >
                <Text>{head.titleHead}</Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {item.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCell}>
                <Text>{item.inventoryName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.refId}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.inventoryGroupName.toUpperCase()}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.description}</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellLast]}>
                <Text>{item.preCondition}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  return (
    <div className="w-full mx-auto my-10">
      <div className="w-full h-screen">
        <PDFViewer width="100%" height="100%">
          <ReceiptPDF />
        </PDFViewer>
      </div>
    </div>
  );
}
