import { numberToCurrency } from '@/lib/utils'
import type { INotaDeCredito } from '@/types'
import {
  Document,
  Image,
  Page,
  PDFViewer,
  Text,
  View
} from '@react-pdf/renderer'

const CreditNote = ({ creditNote }: { creditNote: INotaDeCredito }) => {
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
                  {creditNote.proveedor == null && (
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
                  )}
                  {creditNote.proveedor != null && (
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
                        {creditNote.proveedor.nombre}
                      </Text>
                    </View>
                  )}

                  {creditNote.proveedor != null && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <Text>{creditNote.proveedor.nombre}</Text>
                      <Text>{creditNote.proveedor.direccion}</Text>
                      <Text>Telf: {creditNote.proveedor.contacto}</Text>
                    </View>
                  )}
                  {creditNote.proveedor == null && (
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
                  )}
                  {creditNote.proveedor == null && (
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
                      <Text>NOTA DE CRÉDITO ELECTRÓNICA</Text>
                      <Text>{creditNote.numeroSerie}</Text>
                    </View>
                  )}
                  {creditNote.proveedor != null && (
                    <View
                      style={{
                        display: 'flex',
                        border: '1px solid #000',
                        padding: 10,
                        rowGap: 4,
                        alignItems: 'center'
                      }}
                    >
                      <Text>RAZÓN SOCIAL: {creditNote.proveedor.nombre}</Text>
                      <Text>NOTA DE CRÉDITO ELECTRÓNICA</Text>
                      <Text>{creditNote.numeroSerie}</Text>
                    </View>
                  )}
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
              {creditNote.cliente != null && (
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
                    <Text>{creditNote.cliente.nombreCliente}</Text>
                    <Text>{creditNote.cliente.numeroDocumento}</Text>
                    <Text>{creditNote.cliente.direccion}</Text>
                  </View>
                </View>
              )}
              {creditNote.proveedor != null && (
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
                    <Text>CONTACTO</Text>
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
                    <Text>Soluciones Dimadon S.A.C</Text>
                    <Text>+51914115256</Text>
                    <Text>123 Dimadome Lane, San Juan de Lurigancho</Text>
                  </View>
                </View>
              )}
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
                <Text>FECHA EMISIÓN: {creditNote.fechaDevolucion}</Text>
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
                    <Text>VALOR UNIT.</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text>{creditNote.cantidad}</Text>
                    <Text>{creditNote.descripcion}</Text>
                    <Text>
                      {numberToCurrency(creditNote.producto.precioUnitario)}
                    </Text>
                  </View>
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
                <Text>SON: {creditNote.costoTotal} SOLES</Text>
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
                      creditNote.costoTotal - creditNote.costoTotal * 0.18
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
                  <Text>{numberToCurrency(creditNote.costoTotal * 0.18)}</Text>
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
                  <Text>{numberToCurrency(creditNote.costoTotal)}</Text>
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

export default CreditNote
