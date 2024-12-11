import { numberToCurrency } from '@/lib/utils'
import { IBoletaVenta } from '@/types'
import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View
} from '@react-pdf/renderer'

const Receipt = ({ receipt }: { receipt: IBoletaVenta }) => {
  return (
    <PDFViewer className='w-full h-full min-h-[600px]'>
      <Document language='es'>
        <Page
          size='A4'
          orientation='portrait'
          style={{
            fontFamily: 'Helvetica',
            fontSize: 10,
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            paddingHorizontal: 10
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              padding: 10,
              rowGap: 10
            }}
          >
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
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14
                      }}
                    >
                      Soluciones Dimadon S.A.C
                    </Text>
                    <Image
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTaoyvjvZBcrMSAVYFppNJ2nED7McV8t_dFA&s'
                      style={{ width: 75, height: 75 }}
                      fixed
                    />
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <Text>Don Doug Dimadon</Text>
                    <Text>123 Dimadome Lane</Text>
                    <Text>San Juan de Lurigancho</Text>
                    <Text>Telf: +51914115256</Text>
                    <Text>Email: U22235570@utp.edu.pe</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      border: '1px solid #000',
                      padding: 10,
                      rowGap: 4,
                      alignItems: 'center'
                    }}
                  >
                    <Text>RUC: 10759602825</Text>
                    <Text>BOLETA DE VENTA ELECTRÓNICA</Text>
                    <Text>{receipt.numeroSerie}</Text>
                  </View>
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
            <View>
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  fontWeight: 'ultrabold',
                  rowGap: 4,
                  paddingHorizontal: 10
                }}
              >
                <Text>Observaciones</Text>
                <Text>FECHA EMISIÓN: {receipt.fechaVenta}</Text>
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
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                flexDirection: 'row',
                flexFlow: 1
              }}
            >
              <View
                style={{
                  margin: 10,
                  padding: 10,
                  flexFlow: 1,
                  fontSize: 11
                }}
              >
                <Text>SON: {receipt.costoTotal} SOLES</Text>
              </View>

              <View
                style={{
                  margin: 10,
                  padding: 10
                }}
              >
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
                padding: 10,
                borderTop: '1px solid #c2c2c2'
              }}
            ></View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Receipt
