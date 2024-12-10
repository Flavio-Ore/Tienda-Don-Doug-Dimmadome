import { numberToCurrency } from '@/lib/utils'
import { IBoletaVenta } from '@/types'
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    paddingHorizontal: 10
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    flexFlow: 1,
    textAlign: 'center'
  },
  headerSection: {
    width: '33%',
    margin: 10,
    padding: 10,
    flexFlow: 1
  },
  envoiceBox: {
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    fontSize: 8
  },
  aboutClientBox: {
    border: '1px solid #000',
    display: 'flex',
    width: '100%',
    padding: 10
  },
  aboutClientRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  observations: {
    border: '1px solid #000',
    display: 'flex',
    width: '100%',
    padding: 10,
    height: '500px'
  },
  productsRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10
  },
  bold: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
})

const Receipt = ({ receipt }: { receipt: IBoletaVenta }) => {
  return (
    <PDFViewer className='w-full h-full min-h-[600px]'>
      <Document language='es'>
        <Page size='A4' orientation='portrait' style={styles.page}>
          <View style={styles.row}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: 10,
                alignItems: 'flex-start'
              }}
            >
              <View
                style={{
                  width: '33%',
                  margin: 10,
                  padding: 10,
                  alignItems: 'center'
                }}
              >
                <Text>Soluciones Dimadon</Text>
                <Image
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTaoyvjvZBcrMSAVYFppNJ2nED7McV8t_dFA&s'
                  style={{ width: 75, height: 75 }}
                  fixed
                />
              </View>
              <View
                style={{
                  width: '33%',
                  margin: 10,
                  padding: 10,
                  flexFlow: 1
                }}
              >
                <Text>Don Doug Dimadon</Text>
                <Text>123 Dimadome Lane</Text>
                <Text>San Juan de Lurigancho</Text>
                <Text style={styles.bold}>Telf: 914115256</Text>
                <Text>Email: U22235570@utp.edu.pe</Text>
              </View>
              <View
                style={{
                  width: '33%',
                  margin: 10,
                  padding: 10,
                  flexFlow: 1
                }}
              >
                <View style={styles.envoiceBox}>
                  <Text>RUC: 222-355-70-UTP</Text>
                  <Text>BOLETA DE VENTA ELECTRÓNICA</Text>
                  <Text>{receipt.numeroSerie}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: 10
              }}
            >
              <View
                style={{
                  border: '1px solid #000',
                  display: 'flex',
                  width: '100%',
                  gap: 10,
                  padding: 10
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #000'
                  }}
                >
                  <Text>CLIENTE</Text>
                  <Text>DNI</Text>
                  <Text>DIRECCIÓN</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text>{receipt.cliente.nombreCliente}</Text>
                  <Text>{receipt.cliente.numeroDocumento}</Text>
                  <Text>{receipt.cliente.direccion}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: 10
              }}
            >
              <View
                style={{
                  border: '1px solid #000',
                  display: 'flex',
                  width: '100%',
                  gap: 10,
                  padding: 10
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #000'
                  }}
                >
                  <Text>FECHA EMISIÓN</Text>
                  <Text>FECHA DE VENCIMIENTO</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text>{receipt.fechaVenta}</Text>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: 10
              }}
            >
              <View
                style={{
                  border: '1px solid #000',
                  display: 'flex',
                  width: '100%',
                  gap: 10,
                  padding: 10
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #000'
                  }}
                >
                  <Text>CANTIDAD</Text>
                  <Text>DESCRIPCIÓN</Text>
                  <Text>PRECIO UNIT.</Text>
                  <Text>IMPORTE (Inc.IGV)</Text>
                </View>
                {receipt.items.map(item => (
                  <View
                    key={item.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text>{item.cantidad}</Text>
                    <Text>{item.descripcion}</Text>
                    <Text>
                      {numberToCurrency(item.producto.precioUnitario)}
                    </Text>
                    <Text>{numberToCurrency(item.costoUnitario)}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.header}>
              <View style={styles.headerSection}>
                <Text>Son: {receipt.costoTotal} SOLES</Text>
              </View>
              <View style={styles.headerSection}></View>
              <View style={styles.headerSection}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text>OP. GRAVADA (S/.)</Text>
                  <Text>
                    {numberToCurrency(
                      receipt.costoTotal - receipt.costoTotal * 0.18
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #000',
                    marginBottom: 4,
                    alignItems: 'center'
                  }}
                >
                  <Text>TOTAL IGV (S/.)</Text>
                  <Text>{numberToCurrency(receipt.costoTotal * 0.18)}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text>IMPORTE TOTAL (S/.)</Text>
                  <Text>{numberToCurrency(receipt.costoTotal)}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10
              }}
            >
              <Text
                style={{
                  fontSize: 8,
                  textAlign: 'center'
                }}
              >
                Boleta electrónica autorizada por la Resolución de
                Superintendencia No. 000128-2021/SUNAT
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Receipt
