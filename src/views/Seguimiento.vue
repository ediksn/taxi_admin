<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #Transacciones
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Todas las Transacciones
        v-layout(align-start='', justify-end='', row='', fill-height='')
            v-card(color='', style="border-radius:5px;background-color: #d6d6d6;z-index: 100;position: absolute;width: 30%;overflow-x: auto;height: 300px;")
                v-card(color='', style="border-radius:5px;background-color: #e84646;margin: 1px 4px;border-radius: 0px 0px 20px 20px;")
                    v-card-title(style="padding: 7px;").justify-center
                        span.black--text  Detalles de choferes
                v-flex(xs12)
                  v-layout(align-start='', justify-start='', row='', wrap, fill-height='')
                    v-flex(xs5 style='display:flex;justify-content:center')
                      v-btn(style="background:#38aa21;border-radius:5px;height: 30px;width: 75%;padding: 0px;", @click='Filtro("Disponible")') Disponibles
                    v-flex(xs2 style='margin-top: 7px;')
                      v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
                          v-card-title(style="padding: 7px;").justify-center
                              span.black--text  {{cantt}}
                    v-flex(xs5 style='display:flex;justify-content:center')
                      v-btn(style="background:#e84646;border-radius:5px;height: 30px;width: 75%;padding: 0px;", @click='Filtro("Viajando")') Viajando
                v-card(v-for='(chofer,index) in choferesres', color='', style="border-radius:5px;margin: 1px 4px;background: transparent;margin-top:5px;border: 2px solid;border-color: #e84646;")
                    v-card-title(style="padding: 7px;").justify-center
                        v-flex(xs12 sm12)
                            v-layout(align-center='', justify-start='', row='', wrap fill-height='')
                                v-flex(xs8)
                                    h6(style='line-height: 15px !important;') {{chofer.nombre}} {{chofer.apellido}}
                                    h6(style='line-height: 6px !important;' v-if="chofer.vehiculo && chofer.vehiculo.placa") Placa: {{chofer.vehiculo.placa}}
                                    h6(v-if='chofer.unidad', style='line-height: 6px !important;') Unidad: ({{chofer.unidad}})
                                    h6(style='line-height: 6px !important;' v-if="chofer.vehiculo && chofer.vehiculo.tipo") ({{chofer.vehiculo.tipo}})
                                v-flex(xs4)
                                    v-btn(style="background:#38aa21;border-radius:20px;height: 30px;padding: 0px;", @click='Disponibles(chofer)')
                                      v-icon(color='white' style='margin-right: 5px;') visibility
                                      | ver
        GmapMap(id='mapa', ref="mapa", v-if='posicion[0]',:center='centrarmapa[0]', :zoom='zooom', map-type-id='terrain', style='width: 69%; height: 300px; margin-top: 0px')
          GmapMarker(:key='index', v-for='(m, index) in posicion', :position='m.map', :icon='Icono(m.rol)', :clickable='false', :draggable='false', @click='center=m.map')
          GmapPolyline(v-if='flightPlanCoordinates', :path='flightPlanCoordinates', :options="{ strokeColor:'#73b9ff', strokeWeight: 5}")
          GmapPolyline(v-if='flightPlanCoordinates2', :path='flightPlanCoordinates2', :options="{ strokeColor:'red'}")
          GmapPolygon(v-if='polygono && show === true', v-for='list in polygono', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
          gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
            | <b> Nombre: </b> {{info.nombre}}
            p
            | <b> Costo Salida: </b> RD$ {{info.costo_s}}
            p
            | <b> Costo Destino: </b> RD$ {{info.costo_d}}
            p
            | <b> Area: </b> {{info.perimetro}} Mts²
            p
            | <b> Choferes: </b>
            span(v-for="index in info.choferes") 
              p
              | - {{index.nombre}} {{index.apellido}}
        GmapMap(id='mapa2',v-if='!posicion[0]',:center='{lat: 18.735693, lng: -70.1626511}', :zoom='zooom', map-type-id='terrain', style='width: 69%; height: 300px; margin-top: 0px')
          GmapMarker(:key='index2', v-for='(m2, index2) in posicion', :position='m2.map', :icon='Icono(m2.rol)', :clickable='false', :draggable='false', @click='center=m2.map')
          GmapPolygon(v-if='polygono && show === true', v-for='list in polygono', :paths='list.info', :draggable='false' @click="openInfoWindowTemplate(list)")
          gmap-info-window(:options='{maxWidth: 300}', :position='infoWindow.position', :opened='infoWindow.open', @closeclick='infoWindow.open=false')
            | <b> Nombre: </b> {{info.nombre}}
            p
            | <b> Costo Salida: </b> RD$ {{info.costo_s}}
            p
            | <b> Costo Destino: </b> RD$ {{info.costo_d}}
            p
            | <b> Area: </b> {{info.perimetro}} Mts²
            p
            | <b> Choferes: </b>
            span(v-for="index in info.choferes") 
              p
              | - {{index.nombre}} {{index.apellido}}
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
          v-flex(xs12 sm12)
            v-layout(align-start='', justify-start='', row='')
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;margin-top:5px')
                v-btn(icon, @click='ShowPolg()', style='height: 100%;')
                    v-icon(color='white') map
              v-flex(xs11)
                v-card-title(style="padding: 7px;margin-top:6px;").justify-center
                    span(style="margin-left:70px;").white--text Choferes
              v-flex(xs1)
                  v-btn(v-if="perm", style="background:black;border-radius:5px;height: 30px;padding: 0px;", @click='dialog=true')
                    v-icon(color='white' style='margin-right: 5px;') add_box
                    | Reserva
              v-flex(xs1 style='height: 10px;max-width: 7.333333% !important;flex-basis: 3.333333% !important;margin-top:5px')
                      v-btn(icon, @click='Clean()', style='height: 100%;')
                        v-icon(color='white') refresh
    v-flex(xs12, style="background:white;border-radius: 20px !important;")
      template(style="background:white;border-radius: 20px !important;")
        v-tabs(v-model='active', color="white" style='border-radius: 20px !important;')
          v-tab(:key='0', ripple='').tbsfont Reservas
          v-tab(:key='1', ripple='').tbsfont Busqueda de Reservas
          v-tab-item(:key='0')
            v-layout(align-start='', justify-start='', row='', fill-height='')
              v-flex(xs12)
                v-card(color='', style="border-radius:20px;background-color: #d6d6d6")
                    v-card-title(style="padding: 7px;margin-left: 10px;").justify-center
                        v-flex(xs12 sm12)
                            v-layout(align-start='', justify-start='', row='')
                                v-flex(xs2)
                                    v-checkbox(v-model='pend', label='Pendiente', color='red', hide-details='', @change='Pendiente(pend, "Pendiente")')
                                v-flex(xs2)
                                    v-checkbox(v-model='acep', label='Aceptada', color='indigo', hide-details='', @change='Pendiente(acep, "Aceptada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='ini', label='Iniciado', color='orange', hide-details='', @change='Pendiente(ini, "Iniciado")')
                                v-flex(xs2)
                                    v-checkbox(v-model='ter', label='Terminado', color='secondary', hide-details='', @change='Pendiente(ter, "Terminado")')
                                v-flex(xs2)
                                    v-checkbox(v-model='can', label='Cancelada', color='success', hide-details='', @change='Pendiente(can, "Cancelada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='abor', label='Abortada', color='info', hide-details='', @change='Pendiente(abor, "Abortada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='noa', label='No Atendida', color='orange darken-3', hide-details='', @change='Pendiente(noa, "No atendida")')
                v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;padding-left:20px')
                v-data-table.elevation-1(:headers='headers', :items="transacciones", :search='search', :pagination.sync="pagination", style="margin-top: 5px;")
                  template(slot='items', slot-scope='props')
                    td(v-if="props.item.id_num") {{ props.item.id_num }}
                    td(v-if="!props.item.id_num") {{ "N/A" }}
                    td(v-if='props.item.fecha') {{ props.item.fecha  | moment('DD/MM/YYYY, h:mm a') }}
                    td(v-if='!props.item.fecha') {{ "N/A" }}
                    td(v-if='props.item.horaTerm') {{ props.item.horaTerm  | moment('DD/MM/YYYY, h:mm a') }}
                    td(v-if='!props.item.horaTerm') {{ "N/A" }}
                    td(v-if='props.item.user && !props.item.user_name') {{ props.item.user.nombre }} {{ props.item.user.apellido }}
                    td(v-if='props.item.user_name') {{ props.item.user_name }}
                    td(v-if='!props.item.user && !props.item.user_name') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.nombre }} {{ props.item.driver.apellido }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.vehiculo.tipo }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.unidad }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td {{ props.item.distancia }}
                    td {{ props.item.costo }}
                    td {{ props.item.estatus }}
                    td(v-if='props.item.estatus === "Cancelada" || props.item.estatus === "Abortada" || props.item.estatus === "No atendida" ').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='Observar(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') visibility
                    td(v-if='props.item.estatus === "Pendiente"').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='Ruta(props.item, "Pendiente")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                    td(v-if='props.item.estatus === "Iniciado" || props.item.estatus === "Terminado"').justify-start.layout.px-0
                            v-btn.mx-0(icon, style='margin-top: -9px;', @click='MostrarChof(props.item)')
                                v-icon(color='teal') directions_car
                            v-btn.mx-0(v-if='props.item.estatus === "Iniciado"', icon, @click='Ruta(props.item, "Iniciado")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(v-if='props.item.estatus === "Terminado"', icon, @click='Ruta(props.item, "Terminado")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(v-if='props.item.estatus === "Terminado"', icon, @click='descrit(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') description
                            v-btn.mx-0(v-if='props.item.estatus === "Iniciado"', icon, @click='finalizar(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') flag
                    td(v-if='props.item.estatus === "Aceptada"').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='RutaConChofer(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(icon, style='margin-top: -9px;', @click='MostrarChof(props.item)')
                                v-icon(color='teal') directions_car
                            v-btn.mx-0(icon, @click='Cancell(props.item)', style='margin-top: -9px;')
                                v-icon(color='red') cancel
          v-tab-item(:key='1')
            v-layout(align-start='', justify-start='', row='', fill-height='')
              v-flex(xs12)
                v-card(color='', style="border-radius:20px;background-color: #d6d6d6")
                    v-card-title(style="padding: 7px;margin-left: 10px;").justify-center
                        v-flex(xs12 sm12)
                            v-layout(align-start='', justify-start='', row='')
                                v-flex(xs2)
                                    v-checkbox(v-model='pend2', label='Pendiente', color='red', hide-details='', @change='Pendiente2(pend2, "Pendiente")')
                                v-flex(xs2)
                                    v-checkbox(v-model='acep2', label='Aceptada', color='indigo', hide-details='', @change='Pendiente2(acep2, "Aceptada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='ini2', label='Iniciado', color='orange', hide-details='', @change='Pendiente2(ini2, "Iniciado")')
                                v-flex(xs2)
                                    v-checkbox(v-model='ter2', label='Terminado', color='secondary', hide-details='', @change='Pendiente2(ter2, "Terminado")')
                                v-flex(xs2)
                                    v-checkbox(v-model='can2', label='Cancelada', color='success', hide-details='', @change='Pendiente2(can2, "Cancelada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='abor2', label='Abortada', color='info', hide-details='', @change='Pendiente2(abor2, "Abortada")')
                                v-flex(xs2)
                                    v-checkbox(v-model='noa2', label='No Atendida', color='orange darken-3', hide-details='', @change='Pendiente2(noa2, "No atendida")')
                v-flex(xs12)
                  v-layout(wrap)
                    v-flex(xs6)
                      v-text-field(v-model='search2', append-icon='search', label='Buscar' style='padding-left:20px')
                    v-flex(xs6 style='display: flex;align-items: center;')
                      v-layout(wrap)
                        v-flex(xs5 style='padding-left:20px')
                          el-date-picker(v-model="desde" type='date', placeholder='Desde' style="width: 100%;" @change="comparard(desde,hasta)")
                        v-flex(xs5 style='padding-left:20px')
                            el-date-picker(v-model="hasta" type='date', placeholder='Hasta' style="width: 100%;" @change="comparar(desde,hasta)")
                        v-flex(xs2 style='height: 100%;display:flex;')
                          v-btn(icon, @click='ObtenerReserva()', style='height: 100%;')
                            v-icon(color='black' style='margin-top: 0px;font-size:25px !important') search
                          v-btn(icon, @click='limpiar2()', style='height: 100%;')
                            v-icon(color='black' style='margin-top: 0px;font-size:25px !important') refresh
                v-data-table.elevation-1(:headers='headers', :items="transaccionesbusq", :search='search2', :pagination.sync="pagination", style="margin-top: 5px;")
                  template(slot='items', slot-scope='props')
                    td(v-if="props.item.id_num") {{ props.item.id_num }}
                    td(v-if="!props.item.id_num") {{ "N/A" }}
                    td(v-if='props.item.fecha') {{ props.item.fecha  | moment('DD/MM/YYYY, h:mm a') }}
                    td(v-if='!props.item.fecha') {{ "N/A" }}
                    td(v-if='props.item.horaTerm') {{ props.item.horaTerm  | moment('DD/MM/YYYY, h:mm a') }}
                    td(v-if='!props.item.horaTerm') {{ "N/A" }}
                    td(v-if='props.item.user && !props.item.user_name') {{ props.item.user.nombre }} {{ props.item.user.apellido }}
                    td(v-if='props.item.user_name') {{ props.item.user_name }}
                    td(v-if='!props.item.user && !props.item.user_name') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.nombre }} {{ props.item.driver.apellido }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.vehiculo.tipo }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td(v-if='props.item.driver') {{ props.item.driver.unidad }}
                    td(v-if='!props.item.driver') {{ "N/A" }}
                    td {{ props.item.distancia }}
                    td {{ props.item.costo }}
                    td {{ props.item.estatus }}
                    td(v-if='props.item.estatus === "Cancelada" || props.item.estatus === "Abortada" || props.item.estatus === "No atendida" ').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='Observar(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') visibility
                    td(v-if='props.item.estatus === "Pendiente"').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='Ruta(props.item, "Pendiente")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                    td(v-if='props.item.estatus === "Iniciado" || props.item.estatus === "Terminado"').justify-start.layout.px-0
                            v-btn.mx-0(icon, style='margin-top: -9px;', @click='MostrarChof(props.item)')
                                v-icon(color='teal') directions_car
                            v-btn.mx-0(v-if='props.item.estatus === "Iniciado"', icon, @click='Ruta(props.item, "Iniciado")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(v-if='props.item.estatus === "Terminado"', icon, @click='Ruta(props.item, "Terminado")', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(v-if='props.item.estatus === "Terminado"', icon, @click='descrit(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') description
                            v-btn.mx-0(v-if='props.item.estatus === "Iniciado"', icon, @click='finalizar(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') flag
                    td(v-if='props.item.estatus === "Aceptada"').justify-start.layout.px-0
                            v-btn.mx-0(icon, @click='RutaConChofer(props.item)', style='margin-top: -9px;')
                                v-icon(color='teal') zoom_in
                            v-btn.mx-0(icon, style='margin-top: -9px;', @click='MostrarChof(props.item)')
                                v-icon(color='teal') directions_car
                            v-btn.mx-0(icon, @click='Cancell(props.item)', style='margin-top: -9px;')
                                v-icon(color='red') cancel
    //===========================================================Crear Reserva==============================================================================================
    v-dialog(v-model='dialog', persistent max-width='1100px')
      v-card(color='', style="background-color: #e84646")
        v-card-title(style="padding: 7px;").justify-center
            span.white--text  Crear Reserva
      v-container(style='background-color:white !important;max-width: 1100px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-form(enctype="multipart/form-data")
                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                    v-flex(xs6)
                      v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #676767;width: 89%;")
                        v-card-title(style="padding: 7px;").justify-center
                            span.white--text  Información del Cliente
                      div
                        v-text-field(id="Usuario"
                            outline
                            required
                            mask="Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                            v-model="form2.user_name"
                            prepend-inner-icon="person"
                            label="Nombre del Cliente:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        v-text-field(id="apellido"
                            outline
                            required
                            mask="Aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                            v-model="form2.user_lastname"
                            prepend-inner-icon="person"
                            label="Apellido del Cliente:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        v-text-field(id="tlf"
                            outline
                            required
                            mask="phone"
                            v-model="form2.user_tlf"
                            prepend-inner-icon="phone"
                            label="Telefono:"
                            style="height: 56px;width: 89%;margin-top:10px")
                      v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #676767;width: 89%;margin-top:10px")
                        v-card-title(style="padding: 7px;").justify-center
                            span.white--text  Detalles de Reserva
                      div
                        gmap-autocomplete(id="salida"
                            placeholder="Ingrese ubicación de partida"
                            @place_changed='setPlace'
                            :select-first-on-enter='true'
                            :options='autocompleteOptions'
                            style="height: 56px;width: 89%;margin-top:10px;border: 2px solid;border-color: #757575;sborder-radius: 5px;")
                        gmap-autocomplete(id="llegada"
                            @place_changed='setPlace2'
                            :select-first-on-enter='true'
                            :options='autocompleteOptions'
                            placeholder="Ingrese ubicación de llegada"
                            style="height: 56px;width: 89%;margin-top:10px;border: 2px solid;border-color: #757575;sborder-radius: 5px;")
                        div(id="puntmark" hidden)
                          v-text-field(id="salidamark"
                              outline
                              required
                              readonly
                              v-model="salidamark"
                              prepend-inner-icon="person"
                              label="Punto de Salida:"
                              style="height: 56px;width: 89%;margin-top:10px")
                          v-text-field(id="llegadamark"
                              outline
                              required
                              readonly
                              v-model="llegadamark"
                              prepend-inner-icon="person"
                              label="Punto de Llegada:"
                              style="height: 56px;width: 89%;margin-top:10px")
                        v-select(id="extra"
                            outline
                            required
                            multiple
                            :items="extras"
                            v-model="form2.extras"
                            prepend-inner-icon="star_half"
                            label="Extras:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        v-select(id="vehiculo"
                            outline
                            :items="options"
                            v-model="form2.vehiculo"
                            prepend-inner-icon="local_taxi",
                            @change='transpo(form2.vehiculo)'
                            required
                            style="height: 56px;width: 89%;margin-top:10px;"
                            label="Seleccione Vehiculo:")
                        v-select(id="reservacion"
                            outline
                            :items="opciones"
                            v-model="reservacion"
                            prepend-inner-icon="assignment",
                            required
                            style="height: 56px;width: 89%;margin-top:10px;margin-bottom: 10px;"
                            label="Seleccione si desea agendar la reserva:")
                        template(v-if='reservacion === "Si"')
                          v-flex(xs12='')
                            v-layout(row='', wrap='')
                              v-flex(xs6='', style='flex-basis: 47% !important;')
                                v-dialog(ref='dialog', v-model='modal', :return-value.sync='date', persistent='', lazy='', full-width='', width='290px')
                                  template(v-slot:activator='{ on }')
                                    v-text-field(outline, v-model='date', label='Seleccione el día', prepend-inner-icon='event', readonly='', v-on='on', style="width: 89%;")
                                  v-date-picker(v-model='date', scrollable='', color="red lighten-1", dark='', no-title='')
                                    v-spacer
                                    v-btn(flat='', color='primary', @click='modal = false') Cancel
                                    v-btn(flat='', color='primary', @click='$refs.dialog.save(date)') OK
                              v-flex(xs6='', style='flex-basis: 47% !important;')
                                v-dialog(ref='dialog2', v-model='modal2', :return-value.sync='time', persistent='', lazy='', full-width='', width='290px')
                                  template(v-slot:activator='{ on }')
                                    v-text-field(outline, v-model='time', label='Seleccione la hora', prepend-inner-icon='access_time', readonly='', v-on='on', style="width: 89%;")
                                  v-time-picker(v-if='modal2', v-model='time', full-width='', color="red lighten-1", dark='', no-title='', format="24hr")
                                    v-spacer
                                    v-btn(flat='', color='primary', @click='modal2 = false') Cancel
                                    v-btn(flat='', color='primary', @click='$refs.dialog2.save(time)') OK
                        div(id="idvuelta" hidden)
                          v-select(id="ivuelta"
                              outline
                              :items="options2"
                              @change="idavuelta(select_ida)"
                              v-model="select_ida"
                              prepend-inner-icon="local_taxi",
                              style="height: 56px;width: 89%;margin-top:0px;"
                              label="¿Desea Viaje de Ida y Vuelta?")
                        div(style="display: flex;justify-content: center;width: 89%")
                            v-btn(style="background:grey;border-radius:10px;", @click="limpiar()") Limpiar
                            v-btn(id='resv', style="background:#e84646;border-radius:10px;", @click="crear_reserva()" hidden = true) Buscar
                            v-btn(style="background:grey;border-radius:10px;", @click="salir()") Salir
                    v-flex(xs6)
                      v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #676767;width: 89%;")
                        v-card-title(style="padding: 7px;").justify-center
                            span.white--text  Pago
                      div
                        v-text-field(id="tiempo"
                            outline
                            required
                            disabled
                            v-model="form2.tiempo_viaje"
                            prepend-inner-icon="access_time"
                            label="Tiempo del viaje:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        v-text-field(id="distancia"
                            outline
                            disabled
                            required
                            v-model="form2.distancia"
                            prepend-inner-icon="linear_scale"
                            label="Distancia:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        v-text-field(id="tarifa"
                            outline
                            required
                            disabled
                            v-model="form2.tarifa_aprox"
                            prepend-inner-icon="attach_money"
                            label="Tarifa Aproximada:"
                            style="height: 56px;width: 89%;margin-top:10px")
                        Mapa_S(v-if="renderComponent" :coordl='coord_l' :coords='coord_s')
    //===========================================================Datos trans===============================================================================================
    v-dialog(v-model='dialog6', persistent max-width='700px')
          v-container(style='background-color:white !important;max-width: 700px;')
            v-card-title.justify-center
                span.headline Detalles
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                //- v-text-field(id="chofer"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.driver'
                                //- prepend-inner-icon="description"
                                //- label="Chofer:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="cliente"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.cliente'
                                //- prepend-inner-icon="description"
                                //- label="Cliente:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="fecha"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.fecha'
                                //- prepend-inner-icon="description"
                                //- label="Fecha:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="debe"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.debe'
                                //- prepend-inner-icon="description"
                                //- label="Debe:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="haber"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.haber'
                                //- prepend-inner-icon="description"
                                //- label="Haber:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="comision"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.comision'
                                //- prepend-inner-icon="description"
                                //- label="Comision:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="total"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.total'
                                //- prepend-inner-icon="description"
                                //- label="Total:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="tipo"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.tipo'
                                //- prepend-inner-icon="description"
                                //- label="Tipo:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="AzulOrderId"
                                //- outline
                                //- disabled
                                //- v-if='azul=== true'
                                //- v-model='formtrs.AzulOrderId'
                                //- prepend-inner-icon="description"
                                //- label="Azul Orden Id:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="Azul_RRN"
                                //- outline
                                //- disabled
                                //- v-if='azul=== true'
                                //- v-model='formtrs.Azul_RRN'
                                //- prepend-inner-icon="description"
                                //- label="Azul RRN:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="Azul_estatus"
                                //- outline
                                //- disabled
                                //- v-if='azul=== true'
                                //- v-model='formtrs.Azul_estatus'
                                //- prepend-inner-icon="description"
                                //- label="Azul estatus:"
                                //- style="height: 56px;margin-bottom:10px;")

                                //- v-text-field(id="concepto"
                                //- outline
                                //- disabled
                                //- v-model='formtrs.concepto'
                                //- prepend-inner-icon="description"
                                //- label="Concepto:"
                                //- style="height: 56px;margin-bottom:10px;")

                                v-text-field(id="concepto"
                                outline
                                disabled
                                v-model='formtrs.AzulAuthorizationCode'
                                prepend-inner-icon="description"
                                label="Código de Autorización de Azul:"
                                style="height: 56px;margin-bottom:10px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(style="background:grey;border-radius:10px;", @click.native='close5') Salir
    //===========================================================Datos Chofer==============================================================================================
    v-dialog(v-model='dialog2', persistent max-width='900px')
      v-card(color='', style="background-color: #e84646")
        v-card-title(style="padding: 7px;").justify-center
            span.white--text  Datos Chofer
      v-container(style='background-color:white !important;max-width: 900px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-form(enctype="multipart/form-data")
                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                    v-flex(xs8)
                      v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #676767;width: 100%;")
                        v-card-title(style="padding: 7px;").justify-center
                            span.white--text  Información del Chofer
                      div
                        v-text-field(id="Usuario"
                            outline
                            required
                            disabled
                            v-model="form3.nombre"
                            prepend-inner-icon="person"
                            label="Nombre del Chofer:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="apellido"
                            outline
                            required
                            disabled
                            v-model="form3.apellido"
                            prepend-inner-icon="person"
                            label="Apellido del Chofer:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="iden"
                            outline
                            required
                            disabled
                            v-model="form3.identificacion"
                            prepend-inner-icon="person"
                            label="Identificación:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="tlf"
                            outline
                            required
                            mask="phone"
                            disabled
                            v-model="form3.telefono"
                            prepend-inner-icon="phone"
                            label="Telefono:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="unidad"
                            outline
                            required
                            disabled
                            v-model="form3.unidad"
                            prepend-inner-icon="person"
                            label="Unidad:"
                            style="height: 56px;width: 100%;margin-top:10px")
                      v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #676767;width: 100%;margin-top:10px")
                        v-card-title(style="padding: 7px;").justify-center
                            span.white--text  Información del Vehiculo
                      div
                        v-text-field(id="modelo"
                            outline
                            required
                            disabled
                            v-model="form3.vehiculo.modelo"
                            prepend-inner-icon="local_taxi"
                            label="Modelo:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="placa"
                            outline
                            required
                            disabled
                            v-model="form3.vehiculo.placa"
                            prepend-inner-icon="local_taxi"
                            label="Placa:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="color"
                            outline
                            required
                            disabled
                            v-model="form3.vehiculo.color"
                            prepend-inner-icon="local_taxi"
                            label="Color:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        v-text-field(id="tipo"
                            outline
                            required
                            disabled
                            v-model="form3.vehiculo.tipo"
                            prepend-inner-icon="local_taxi"
                            label="Tipo:"
                            style="height: 56px;width: 100%;margin-top:10px")
                        div(style="display: flex;justify-content: center;width: 100%")
                            v-btn(style="background:grey;border-radius:10px;", @click="exit2()") Salir
    //===========================================================Datos Transaccion==============================================================================================
    v-dialog(v-model='dialog5', persistent max-width='900px')
      v-card(color='', style="background-color: #e84646")
        v-card-title(style="padding: 7px;").justify-center
            span.white--text  Transacciones
      v-container(style='background-color:white !important;max-width: 900px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-form(enctype="multipart/form-data")
                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                    v-flex(xs12)
                      v-layout(align-start='', justify-start='', row='', fill-height='')
                        v-flex(xs12)
                          v-card(color='', style="background-color: #e84646;")
                            v-flex(xs12)
                              v-layout(align-start='', justify-start='', row='', wrap, fill-height='')
                                v-flex(xs12 style='display:flex;justify-content:center')
                                  v-card-title(style="padding: 7px;margin-top: 5px;").justify-start
                                      span.white--text Lista de Transacciones
                          v-data-table.elevation-1(:headers='headers2', :items="transacciones2detail", :search='search', :pagination.sync="pagination", style="margin-top: 0px;")
                            template(slot='items', slot-scope='props')
                              //- td(v-if='props.item.driver') {{ props.item.driver.nombre }} {{ props.item.driver.apellido }}
                              //- td(v-if='!props.item.driver') {{ "N/A" }}
                              //- td(v-if='props.item.cliente') {{ props.item.cliente.nombre }} {{ props.item.cliente.apellido }}
                              //- td(v-if='!props.item.cliente') {{ "N/A" }}
                              td {{ props.item.fecha | moment('DD-MM-YYYY hh:mm A')}}
                              //- td(v-if='props.item.debe') {{ props.item.debe }}
                              //- td(v-if='!props.item.debe') {{ "N/A" }}
                              //- td(v-if='props.item.haber') {{ props.item.haber }}
                              //- td(v-if='!props.item.haber') {{ "N/A" }}
                              //- td(v-if='props.item.comision') {{ props.item.comision }}
                              //- td(v-if='!props.item.comision') {{ "N/A" }}
                              //- td {{ props.item.total }}
                              td(v-if='props.item.tipo') {{ props.item.tipo }}
                              td(v-else) - -
                              td(v-if='props.item.concepto && props.item.concepto.nombre') {{ props.item.concepto.nombre }}
                              td(v-else) - -
                              td.justify-start.layout.px-0
                                v-btn.mx-0(icon, @click='editItemtrs(props.item)' style='margin-top: -7px;')
                                    v-icon(color='teal') visibility

                      div(style="display: flex;justify-content: center;width: 100%")
                          v-btn(style="background:grey;border-radius:10px;", @click="exit2()") Salir
    //===========================================================Modal Espera==============================================================================================
    v-dialog(v-model='dialog3', persistent max-width='400px')
      v-container(style='background-color:white !important;max-width: 400px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                v-flex(xs12)
                  v-card-title(style="padding: 7px;").justify-center
                    h3.black--text  Buscando Chofer.!!
                    h5.black--text  Por favor espere...
                v-flex(xs12)
                    .text-xs-center
                      v-progress-circular(indeterminate='', color='primary')
                v-flex(xs12)
                  v-card-title(style="padding: px;").justify-center
                    v-btn(style="background:grey;border-radius:10px;", @click="exit()") Cancelar
    //===========================================================Modal Espera==============================================================================================
    v-dialog(v-model='dialog4', persistent max-width='600px')
      v-container(style='background-color:white !important;max-width: 600px;')
        div(style="margin-top: 20px;")
            v-flex(xs12 sm12)
              v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                v-flex(xs12)
                  v-card-title(style="padding: 7px;").justify-center
                    h3.black--text  Esperando Respuesta del Servidor.!!
                v-flex(xs12)
                    .text-xs-center
                      img(src='../assets/gif_taxi2.gif', with='200' ,height='150')
                v-flex(xs12)
                  v-card-title(style="padding: 7px;").justify-center
                    h4.black--text  Por favor espere...


</template>

<script>
import Mapa_S from "@/components/Mapa_S";
import Api from "@/services/methods";
import { EventBus } from "../Events.js";
export default {
  name: "mSeguimiento",
  components: {
    Mapa_S
  },
  data: () => ({
    autocompleteOptions: {
      componentRestrictions: {
        country: ["do"]
      }
    },
    desde: "",
    hasta: "",
    permitir: true,
    active: null,
    reservacion: "No",
    modal2: false,
    search: "",
    search2: "",
    date: null,
    time: null,
    modal: false,
    renderComponent: true,
    dia_reserva: "",
    suma: 0,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    mapa: ["hola"],
    extras: [],
    ruta_reserva: [],
    formtrs: {
      driver: '',
      cliente: '',
      fecha: '',
      debe: '',
      haber: '',
      comision: '',
      total: '',
      tipo: '',
      concepto: '',
      AzulAuthorizationCode: '',
      AzulOrderId: '',
      Azul_RRN: '',
      Azul_estatus: '',
      payer_info: ''
    },
    defaultFormtrs: {
      driver: '',
      cliente: '',
      fecha: '',
      debe: '',
      haber: '',
      comision: '',
      total: '',
      tipo: '',
      concepto: '',
      AzulOrderId: '',
      Azul_RRN: '',
      Azul_estatus: '',
      payer_info: ''
    },
    azul: false,
    centermap: { lat: 18.492144, lng: -69.942564 },
    punto_reserva: [],
    options: ["Taxi", "Moto"],
    options2: ["Si", "No"],
    transaccionesres: [],
    opciones: ["Si", "No"],
    select_ida: "",
    show: true,
    form3: {
      nombre: "",
      apellido: "",
      identificacion: "",
      telefono: "",
      unidad: "",
      vehiculo: []
    },
    defaultForm3: {
      nombre: "",
      apellido: "",
      unidad: "",
      identificacion: "",
      telefono: "",
      vehiculo: []
    },
    cantt: 0,
    form2: {
      user_name: "",
      user_lastname: "",
      user_tlf: "",
      tipo: "Web",
      origen: {},
      destino: {},
      tiempo_viaje: "",
      distancia: "",
      tarifa_aprox: "",
      salida: "",
      llegada: "",
      booking: null,
      extras: [],
      vehiculo: "Taxi",
      ida_vuelta: false
    },
    defaultForm2: {
      user_name: "",
      user_lastname: "",
      user_tlf: "",
      tipo: "Web",
      origen: {},
      destino: {},
      tiempo_viaje: "",
      distancia: "",
      tarifa_aprox: "",
      salida: "",
      booking: null,
      llegada: "",
      extras: [],
      vehiculo: "Taxi",
      ida_vuelta: false
    },
    dialog: false,
    pend: false,
    acep: false,
    ini: false,
    ter: false,
    can: false,
    abor: false,
    pend2: false,
    acep2: false,
    ini2: false,
    ter2: false,
    can2: false,
    abor2: false,
    icono: "https://maps.google.com/mapfiles/kml/shapes/library_maps.png",
    iconp: require("../assets/male-2.png"),
    iconc: require("../assets/taxi.png"),
    info: [],
    infoWindow: {
      position: { lat: 0, lng: 0 },
      open: false,
      template: ""
    },
    all: true,
    noa: false,
    noa2: false,
    pagination: {
      sortBy: 'fecha', // The field that you're sorting by
      descending: true
    },
    perm: "",
    centrarmapa: [],
    ico: "",
    polygono: [],
    zooom: 12,
    posicionall: [],
    posicion: [],
    editedIndex: -1,
    transacciones: [],
    transaccionesbusq: [],
    transaccionesbusqres: [],
    transacciones2: [],
    prueba: [],
    dialog5: false,
    dialog6: false,
    coord_s: {},
    coord_l: {},
    distancia: "",
    flightPlanCoordinates: [],
    flightPlanCoordinates2: [],
    transacciones2detail: [],
    choferes: [],
    choferesres: [],
    clientes: [],
    sortBy: 'fecha',
    descending: false,
    headers: [
      { text: "ID", value: "id_num" },
      { text: "Hora de creación", value: "fecha" },
      { text: "Hora fin", value: "horaTerm" },
      { text: "Cliente", value: "fullname" },
      { text: "Chofer", value: "fullnameD" },
      { text: "Vehiculo", value: "vehiculo" },
      { text: "Unidad", value: "driver.unidad" },
      { text: "Distancia", value: "distancia" },
      { text: "Costo", value: "costo" },
      { text: "Estatus", value: "estatus" },
      { text: "Ver" }
    ],
    headers2: [
      // { text: "ID", value: "_id"},
      // { text: "Chofer", value: "driver.nombre" },
      // { text: "Cliente", value: "cliente.nombre" },
      { text: "Fecha", value: "fecha" },
      // { text: "Debe", value: "debe" },
      // { text: "Haber", value: "haber" },
      // { text: "Comisión", value: "comision" },
      // { text: "Iva", value: "iva" },
      // { text: "Total", value: "total" },
      { text: "Tipo", value: "tipo" },
      { text: "Concepto", value: "concepto.nombre" },
      { text: "Acciones"}
    ],
    brq: "",
    act: {},
    id_reserv: "",
    salidamark: "",
    llegadamark: "",
    sockt_res: "",
    contador: 0,
    contador2: 0
  }),
  created() {
    this.verificacion();
    this.initialize();
    // this.actualizarchof();
  },
  watch: {
    brq() {
      document.getElementById("idvuelta").hidden = false;
      document.getElementById("resv").hidden = false;
    },
    active() {
      if (this.active === 0) {
        this.transaccionesbusq = [];
        this.transaccionesbusqres = [];
        this.pend2 = false;
        this.acep2 = false;
        this.ini2 = false;
        this.ter2 = false;
        this.can2 = false;
        this.abor2 = false;
        this.noa2 = false;
      }
    }
  },
  sockets: {
    act_reserv2() {
      this.sockt();
    },
    caducado(data) {
      this.sockt_res = data._id;
      if (this.id_reserv === data._id && !data.booking) {
        this.$swal.fire(
          "Oops...",
          "Viaje caducado, el viaje ha sido cancelado por exceder el limite de tiempo de espera o por no poseer choferes disponibles.",
          "error"
        );
        this.dialog3 = false;
        this.id_reserv = "";
      }
    },
    aceptado(data) {
      if (this.id_reserv === data.reserva._id) {
        this.form3.nombre = data.chofer.nombre;
        this.form3.apellido = data.chofer.apellido;
        this.form3.identificacion = data.chofer.identificacion;
        this.form3.telefono = data.chofer.telefono;
        this.form3.vehiculo = data.chofer.vehiculo;
        if (data.chofer.unidad) {
          this.form3.unidad = data.chofer.unidad
        } else {
          this.form3.unidad = "N/A"
        }
        this.dialog3 = false;
        this.dialog2 = false;
        this.dialog2 = true;
        this.salir();
        this.$swal.fire(
          "Felicidades.!",
          "Se ha encontrado un chofer para su viaje.",
          "success"
        );
        this.id_reserv = "";
        document.getElementById("salida").value = "";
        document.getElementById("llegada").value = "";
        document.getElementById("salida").disabled = false;
        document.getElementById("llegada").disabled = false;
      }
    }
  },
  mounted() {
    EventBus.$on("info", data => {
      this.form2.tarifa_aprox =
        "RD$ " +
        Math.round(data.tarifa_aprox)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      this.form2.distancia = data.distancia;
      this.form2.tiempo_viaje = data.tiempo_viaje;
      this.form2.salida = data.pto_partida;
      this.form2.llegada = data.pto_llegada;
      this.salidamark = data.pto_partida;
      this.llegadamark = data.pto_llegada;
      this.dialog4 = false;
      this.brq = data.tarifa_aprox;
      document.getElementById("salida").disabled = true;
      document.getElementById("llegada").disabled = true;
    });
    EventBus.$on("puntos", data => {
      this.form2.origen = data.origen;
      this.form2.destino = data.destino;
      this.form2.vehiculo = data.vehiculo;
    });
    EventBus.$on("esperar", data => {
      this.dialog4 = true;
    });
    EventBus.$on("error", data => {
      this.form2.vehiculo = "Taxi";
      this.dialog4 = false;
    });
    EventBus.$on("autocomp", data => {
      document.getElementById("puntmark").hidden = false;
      document.getElementById("salida").hidden = true;
      document.getElementById("llegada").hidden = true;
    });
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Seguimiento") {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (this.$store.state.usuario.permisos[i].accion[j] === "Crear") {
              return (this.perm = "yes");
            }
          }
        }
      }
    },
    comparard(desde, hasta) {
      if (hasta) {
        if (this.$moment(desde).isSameOrBefore(hasta) === false) {
          this.$swal.fire(
            "Oops...",
            "Fecha invalida, por favor elija una fecha donde DESDE sea menor que HASTA.",
            "error"
          );
          this.desde = "";
          this.hasta = "";
        }
      }
    },
    ObtenerReserva() {
      if (this.desde && this.hasta) {
        this.dialog4 = true;
        Api.get("reserva/fechas2/" + this.desde + "/" + this.hasta)
          .then(res => {
            this.transaccionesbusq = res.data;
            this.transaccionesbusqres = res.data;
            for (let i = 0; i < this.transaccionesbusq.length; i++) {
              if (this.transaccionesbusq[i].costo) {
                this.transaccionesbusq[i].costo =
                  "RD$ " +
                  Math.round(this.transaccionesbusq[i].costo)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
              } else {
                this.transaccionesbusq[i].costo = "RD$ " + 0;
              }
              if (this.transaccionesbusq[i].user && !this.transaccionesbusq[i].user_name) {
                this.transaccionesbusq[i].fullname = this.transaccionesbusq[i].user.nombre + " " + this.transaccionesbusq[i].user.apellido;
              } else {
                if (this.transaccionesbusq[i].user_name) {
                  this.transaccionesbusq[i].fullname = this.transaccionesbusq[i].user_name;
                }
              }
              if (this.transaccionesbusq[i].driver) {
                this.transaccionesbusq[i].fullnameD = this.transaccionesbusq[i].driver.nombre + " " + this.transaccionesbusq[i].driver.apellido;
              }
            }
            this.dialog4 = false;
          })
          .catch(err => {
            this.dialog4 = false;
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, verifique los datos o llame al administrador.",
              "error"
            );
          });
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, debe ingresar ambas fechas para realizar esta operación.",
          "error"
        );
      }
    },
    comparar(desde, hasta) {
      if (desde) {
        if (this.$moment(desde).isSameOrBefore(hasta) === false) {
          this.$swal.fire(
            "Oops...",
            "Fecha invalida, por favor elija una fecha donde DESDE sea menor que HASTA.",
            "error"
          );
          this.desde = "";
          this.hasta = "";
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Fecha invalida, por favor elija una fecha de inicio.",
          "error"
        );
        this.desde = "";
        this.hasta = "";
      }
    },
    descrit(item) {
      this.transacciones2detail = []
      if (item._id) {
        for (let i = 0; i < this.transacciones2.length; i++) {
          if (this.transacciones2[i].reserva && this.transacciones2[i].reserva.toString() === item._id.toString()){
            this.transacciones2detail.push(this.transacciones2[i])
          }
        }
      }
      this.dialog5 = true
    },
    Filtro(item) {
      this.permitir = false;
      this.dialog4 = true;
      setTimeout(
        function() {
          this.choferesres = [];
          if (item === "Disponible") {
            for (let i = 0; i < this.choferes.length; i++) {
              if (this.choferes[i].estatus === "Disponible") {
                this.choferesres.push(this.choferes[i]);
              }
            }
            this.cantt = this.choferesres.length;
            this.posicion = [];
            this.flightPlanCoordinates = [];
            this.centrarmapa = [];
            this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
            this.zooom = 12;
            for (let i = 0; i < this.choferesres.length; i++) {
              if (
                this.choferesres[i].estatus === "Viajando" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({ rol: "viajando", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Viajando" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({ rol: "moto", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Disponible" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({ rol: "chofer", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Disponible" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({ rol: "motod", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
            }
            // this.$gmapApiPromiseLazy().then(() => {
            //   var bounds = new google.maps.LatLngBounds(); /* etc */
            //   for (let i = 0; i < this.centrarmapa.length; i++) {
            //     bounds.extend(this.centrarmapa[i])
            //   }
            //   this.$refs.mapa.$mapObject.fitBounds(bounds);
            // });
            // if (this.centrarmapa.length === 0) {
            //   this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
            // }
          } else {
            for (let i = 0; i < this.choferes.length; i++) {
              if (this.choferes[i].estatus !== "Disponible") {
                this.choferesres.push(this.choferes[i]);
              }
            }
            this.cantt = this.choferesres.length;
            this.posicion = [];
            this.flightPlanCoordinates = [];
            this.centrarmapa = [];
            this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
            this.zooom = 12;
            for (let i = 0; i < this.choferesres.length; i++) {
              if (
                this.choferesres[i].estatus === "Viajando" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({ rol: "viajando", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Viajando" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({ rol: "moto", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Disponible" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({ rol: "chofer", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
              if (
                this.choferesres[i].estatus === "Disponible" &&
                this.choferesres[i].vehiculo && this.choferesres[i].vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({ rol: "motod", map: this.choferesres[i].map });
                this.centrarmapa.push(this.choferesres[i].map);
              }
            }
            // this.$gmapApiPromiseLazy().then(() => {
            //   var bounds = new google.maps.LatLngBounds(); /* etc */
            //   for (let i = 0; i < this.centrarmapa.length; i++) {
            //     bounds.extend(this.centrarmapa[i])
            //   }
            //   this.$refs.mapa.$mapObject.fitBounds(bounds);
            //   if (this.centrarmapa.length === 0) {
            //     this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
            //     this.zooom = 12
            //   }
            // });
          }
          this.dialog4 = false;
        }.bind(this),
        3000
      );
    },
    MostrarChof(data) {
      this.form3.nombre = data.driver.nombre;
      this.form3.apellido = data.driver.apellido;
      this.form3.identificacion = data.driver.identificacion;
      this.form3.telefono = data.driver.telefono;
      this.form3.vehiculo = data.driver.vehiculo;
      if (data.driver.unidad) {
        this.form3.unidad = data.driver.unidad
      } else {
        this.form3.unidad = "N/A"
      }
      this.dialog2 = true;
    },
    idavuelta(data) {
      if (data === "Si") {
        this.dialog4 = true;
        let info = {
          origen: this.form2.origen,
          destino: this.form2.destino,
          ida_vuelta: true,
          vehiculo: this.form2.vehiculo
        };
        Api.post("reserva/consulta", info)
          .then(res => {
            this.dialog4 = false;
            this.form2.tiempo_viaje =
              (res.data.data.tiempo / 60).toFixed(0) + " min";
            this.form2.distancia = res.data.data.distancia;
            this.form2.tarifa_aprox =
              "RD$ " +
              Math.round(res.data.data.costo)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            this.form2.pto_partida = res.data.data.salida;
            this.form2.pto_llegada = res.data.data.llegada;
            let dat = {
              origen: this.form2.origen,
              destino: this.form2.destino,
              seleccion: "Si"
            };
            EventBus.$emit("other_rut", dat);
          })
          .catch(err => {
            this.dialog4 = false;
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, error al comunicarse con el servidor.",
              "error"
            );
          });
      } else {
        this.dialog4 = true;
        let info = {
          origen: this.form2.origen,
          destino: this.form2.destino,
          ida_vuelta: false
        };
        Api.post("reserva/consulta", info)
          .then(res => {
            this.dialog4 = false;
            document.getElementById("puntmark").hidden = true;
            document.getElementById("idvuelta").hidden = true;
            this.select_ida = "";
            document.getElementById("resv").hidden = true;
            this.form2.tarifa_aprox = "";
            this.form2.distancia = "";
            this.form2.tiempo_viaje = "";
            this.form2.salida = "";
            this.form2.llegada = "";
            this.salidamark = "";
            this.llegadamark = "";
            document.getElementById("salida").hidden = false;
            document.getElementById("llegada").hidden = false;
            document.getElementById("salida").disabled = false;
            document.getElementById("llegada").disabled = false;
            document.getElementById("salida").value = "";
            document.getElementById("llegada").value = "";
            this.renderComponent = false;
            this.$nextTick(() => {
              // Add the component back in
              this.renderComponent = true;
            });
          })
          .catch(err => {
            this.dialog4 = false;
            console.log(err);
            this.$swal.fire(
              "Oops...",
              "Error encontrado, error al comunicarse con el servidor.",
              "error"
            );
          });
      }
    },
    crear_reserva() {
      let str = "";
      if (this.form2.vehiculo === "") {
        str = str + "Vehiculo, ";
      }
      if (this.reservacion === "Si") {
        this.form2.booking = this.date + "T" + this.time + ":00.000";
      }
      if (this.select_ida === "Si") {
        this.form2.ida_vuelta = true;
      } else {
        this.form2.ida_vuelta = false;
      }
      if (!this.form2.user_name) {
        this.form2.user_name = "-Operador";
      }
      if (!this.form2.user_lastname) {
        this.form2.user_lastname = "-";
      }
      if (!this.form2.user_tlf) {
        this.form2.user_tlf = "0000000000";
      }
      if (this.reservacion === "No") {
        if (
          this.form2.user_name &&
          this.form2.user_lastname &&
          this.form2.user_tlf &&
          this.form2.vehiculo
        ) {
          this.id_reserv = "";
          let usuario = "";
          Api.get("cliente/admin").then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].estatus === "Web") {
                usuario = res.data[i]._id;
              }
            }
            if (usuario) {
              let form = {
                user_name: this.form2.user_name,
                user_lastname: this.form2.user_lastname,
                user_tlf: this.form2.user_tlf,
                origen: {
                  lat: parseFloat(this.form2.origen.lat),
                  lng: parseFloat(this.form2.origen.lng)
                },
                destino: {
                  lat: parseFloat(this.form2.destino.lat),
                  lng: parseFloat(this.form2.destino.lng)
                },
                salida: this.form2.salida,
                llegada: this.form2.llegada,
                booking: this.form2.booking,
                extras: this.form2.extras,
                vehiculo: this.form2.vehiculo,
                ida_vuelta: this.form2.ida_vuelta,
                user: usuario
              };
              this.dialog4 = true;
              Api.post("reserva", form)
                .then(res => {
                  this.id_reserv = res.data.data._id;
                  this.dialog4 = false;
                  if (form.booking === null) {
                    this.dialog3 = true;
                    if (this.id_reserv === this.sockt_res) {
                      this.$swal.fire(
                        "Oops...",
                        "Viaje caducado, el viaje ha sido cancelado por exceder el limite de tiempo de espera o por no poseer choferes disponibles.",
                        "error"
                      );
                      this.dialog3 = false;
                      this.id_reserv = "";
                      this.sockt_res = "";
                      this.time = null;
                      this.date = null;
                      this.reservacion = "No";
                    }
                  } else {
                    this.salir();
                    this.$swal.fire(
                      "Felicidades.!",
                      "Su reserva se ha agendado correctamente.",
                      "success"
                    );
                    this.dialog = false;
                    this.id_reserv = "";
                    this.sockt_res = "";
                    this.time = null;
                    this.date = null;
                    this.reservacion = "No";
                  }
                })
                .catch(err => {
                  this.dialog4 = false;
                  this.$swal.fire(
                    "Oops...",
                    "Error encontrado, no se pudo comunicar con el servidor, por favor intente se nuevo.",
                    "error"
                  );
                });
            } else {
              this.$swal.fire(
                "Oops...",
                "Error encontrado, no existe el usuario web para crear la reserva, verifique la lista de clientes si se encuentra disponible, en caso de no existir llame al administrador.",
                "error"
              );
            }
          });
        } else {
          this.$swal.fire(
            "Oops...",
            "Error encontrado, debe llenar los campos '" +
              str +
              "' para continuar.",
            "error"
          );
        }
      } else {
        if (this.date === null) {
          str = str + "Fecha de la reserva para agendar, ";
        }
        if (this.time === null) {
          str = str + "Hora de la reserva para agendar.";
        }
        if (
          this.form2.user_name &&
          this.form2.user_lastname &&
          this.form2.user_tlf &&
          this.form2.vehiculo &&
          this.time &&
          this.date
        ) {
          this.id_reserv = "";
          let usuario = "";
          Api.get("cliente/admin").then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].estatus === "Web") {
                usuario = res.data[i]._id;
              }
            }
            if (usuario) {
              let form = {
                user_name: this.form2.user_name,
                user_lastname: this.form2.user_lastname,
                user_tlf: this.form2.user_tlf,
                origen: {
                  lat: parseFloat(this.form2.origen.lat),
                  lng: parseFloat(this.form2.origen.lng)
                },
                destino: {
                  lat: parseFloat(this.form2.destino.lat),
                  lng: parseFloat(this.form2.destino.lng)
                },
                salida: this.form2.salida,
                llegada: this.form2.llegada,
                booking: this.form2.booking,
                extras: this.form2.extras,
                vehiculo: this.form2.vehiculo,
                ida_vuelta: this.form2.ida_vuelta,
                user: usuario
              };
              this.dialog4 = true;
              Api.post("reserva", form)
                .then(res => {
                  this.id_reserv = res.data.data._id;
                  this.dialog4 = false;
                  if (form.booking === null) {
                    this.dialog3 = true;
                    if (this.id_reserv === this.sockt_res) {
                      this.$swal.fire(
                        "Oops...",
                        "Viaje caducado, el viaje ha sido cancelado por exceder el limite de tiempo de espera o por no poseer choferes disponibles.",
                        "error"
                      );
                      this.dialog3 = false;
                      this.id_reserv = "";
                      this.sockt_res = "";
                      this.time = null;
                      this.date = null;
                      this.reservacion = "No";
                    }
                  } else {
                    this.salir();
                    this.$swal.fire(
                      "Felicidades.!",
                      "Su reserva se ha agendado correctamente.",
                      "success"
                    );
                    this.dialog = false;
                    this.time = null;
                    this.date = null;
                    this.reservacion = "No";
                  }
                })
                .catch(err => {
                  this.dialog4 = false;
                  this.$swal.fire(
                    "Oops...",
                    "Error encontrado, no se pudo comunicar con el servidor, por favor intente se nuevo.",
                    "error"
                  );
                });
            } else {
              this.$swal.fire(
                "Oops...",
                "Error encontrado, no existe el usuario web para crear la reserva, verifique la lista de clientes si se encuentra disponible, en caso de no existir llame al administrador.",
                "error"
              );
            }
          });
        } else {
          this.$swal.fire(
            "Oops...",
            "Error encontrado, debe llenar los campos '" +
              str +
              "' para continuar.",
            "error"
          );
        }
      }
    },
    setPlace(place) {
      let latLng = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      };
      this.coord_s = latLng;
      this.form2.salida = place.formatted_address;
    },
    setPlace2(place) {
      if (!place) return;

      let latLng = {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      };
      this.coord_l = latLng;
      this.form2.llegada = place.formatted_address;
    },
    calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      start,
      destination
    ) {
      directionsDisplay.setMap(this.$refs.map.$mapObject);
      directionsService.route(
        {
          origin: start,
          destination: destination,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
            this.punto_reserva = [];
            this.ruta_reserva = [];
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    Cancell(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Abortar!"
        })
        .then(result => {
          if (result.value) {
            let info = {
              _id: item._id,
              estatus: "Abortada"
            };
            Api.put("reserva", info)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Reserva abortada exitosamente.",
                  "success"
                );
                this.Clean();
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
    },
    finalizar(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Finalizar!"
        })
        .then(result => {
          if (result.value) {
            let info = {
              _id: item._id,
              estatus: "Terminado"
            };
            Api.put("reserva", info)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Reserva finalizada exitosamente.",
                  "success"
                );
                this.Clean();
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
    },
    getDirection() {
      this.$gmapApiPromiseLazy().then(() => {
        var bounds = new google.maps.LatLngBounds(); /* etc */
      });
      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        this.punto_reserva[0].map,
        this.punto_reserva[1].map
      );
      this.punto_reserva = [];
      // this.centermap = this.punto_reserva[0].map;
    },
    limpiar() {
      document.getElementById("puntmark").hidden = true;
      document.getElementById("idvuelta").hidden = true;
      this.select_ida = "";
      document.getElementById("resv").hidden = true;
      this.form2 = Object.assign({}, this.defaultForm2);
      this.punto_reserva = [];
      this.time = null;
      this.date = null;
      this.reservacion = "No";
      this.ruta_reserva = [];
      document.getElementById("salida").hidden = false;
      document.getElementById("llegada").hidden = false;
      document.getElementById("salida").disabled = false;
      document.getElementById("llegada").disabled = false;
      document.getElementById("salida").value = "";
      document.getElementById("llegada").value = "";
      this.renderComponent = false;
      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
    },
    exit2() {
      this.dialog2 = false;
      this.dialog5 = false;
    },
    exit() {
      this.dialog3 = false;
      let body = {
        _id: this.id_reserv,
        estatus: "Abortada"
      };
      Api.put("reserva", body).then(res => {
        this.$swal.fire(
          "Felicidades.!",
          "Viaje cancelado exitosamente.",
          "success"
        );
      });
    },
    salir() {
      this.limpiar();
      document.getElementById("puntmark").hidden = true;
      document.getElementById("idvuelta").hidden = true;
      this.select_ida = "";
      document.getElementById("salida").hidden = false;
      document.getElementById("llegada").hidden = false;
      document.getElementById("resv").hidden = true;
      this.form2 = Object.assign({}, this.defaultForm2);
      this.punto_reserva = [];
      this.ruta_reserva = [];
      this.time = null;
      this.date = null;
      this.reservacion = "No";
      this.renderComponent = false;
      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true;
      });
      this.dialog = false;
    },
    eventomap(data, info) {
      if (this.punto_reserva.length < 2) {
        if (this.punto_reserva.length < 1) {
          this.punto_reserva.push({
            map: { lat: data.lat(), lng: data.lng() },
            rol: "cliente"
          });
        } else {
          this.punto_reserva.push({
            map: { lat: data.lat(), lng: data.lng() },
            rol: "finish"
          });
        }
        // this.ruta_reserva.push(data);
      }
      if (this.punto_reserva.length === 2) {
        let body = {
          origen: this.punto_reserva[0].map,
          destino: this.punto_reserva[1].map
        };
        Api.post("reserva/consulta", body).then(res => {
          this.form2.tiempo_viaje =
            (res.data.data.tiempo / 60).toFixed(0) + " min";
          this.form2.distancia = res.data.data.distancia;
          this.form2.tarifa_aprox = "RD$ " + res.data.data.costo;
        });
        this.getDirection();
      }
    },
    Icono(data) {
      if (data === "chofer") {
        return require("../assets/taxi.png");
      }
      if (data === "cliente") {
        return require("../assets/male-2.png");
      }
      if (data === "finish") {
        return require("../assets/finish.png");
      }
      if (data === "viajando") {
        return require("../assets/car_share.png");
      }
      if (data === "moto") {
        return require("../assets/motorcycle.png");
      }
      if (data === "motod") {
        return require("../assets/vespa.png");
      }
      if (data === "stop") {
        return require("../assets/stop.png");
      }
    },
    ObtChoferes() {
      Api.get("chofer/admin/seguimiento").then(res => {
        this.choferes = [];
        this.choferesres = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Disponible" ||
            res.data[i].estatus === "Viajando"
          ) {
            this.choferes.push(res.data[i]);
            this.choferesres.push(res.data[i]);
          }
        }
        this.cantt = this.choferesres.length
      });
    },
    Disponibles(data) {
      this.zooom = 12;
      this.posicion = [];
      this.centrarmapa = [];
      this.flightPlanCoordinates = [];
      this.flightPlanCoordinates2 = [];
      if (data.estatus === "Viajando" && data.vehiculo && data.vehiculo.tipo === "Taxi") {
        this.centrarmapa.push(data.map);
        this.posicion.push({ rol: "viajando", map: data.map });
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(data.map);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
          this.zooom = 15;
        });
      }
      if (data.estatus === "Viajando" && data.vehiculo && data.vehiculo.tipo === "Moto") {
        this.posicion.push({ rol: "moto", map: data.map });
        this.centrarmapa.push(data.map);
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(data.map);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
          this.zooom = 15;
        });
      }
      if (data.estatus === "Disponible" && data.vehiculo && data.vehiculo.tipo === "Taxi") {
        this.posicion.push({ rol: "chofer", map: data.map });
        this.centrarmapa.push(data.map);
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(data.map);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
          this.zooom = 15;
        });
      }
      if (data.estatus === "Disponible" && data.vehiculo && data.vehiculo.tipo === "Moto") {
        this.posicion.push({ rol: "motod", map: data.map });
        this.centrarmapa.push(data.map);
        this.$gmapApiPromiseLazy().then(() => {
          var bounds = new google.maps.LatLngBounds(); /* etc */
          bounds.extend(data.map);
          this.$refs.mapa.$mapObject.fitBounds(bounds);
          this.zooom = 15;
        });
      }
      this.acep = false;
      this.ini = false;
      this.ter = false;
      this.can = false;
      this.abor = false;
      this.noa = false;
      this.pend = false;
    },
    transpo(item) {
      if (item === "Taxi" && this.form2.origen.lat && this.form2.destino.lat) {
        let data;
        if (this.select_ida === "Si") {
          data = {
            origen: this.form2.origen,
            destino: this.form2.destino,
            vehiculo: item,
            ida_vuelta: true
          };
          EventBus.$emit("transpo", data);
        }
        if (!this.select_ida) {
          data = {
            origen: this.form2.origen,
            destino: this.form2.destino,
            vehiculo: item
          };
          EventBus.$emit("transpo", data);
        }
      }
      if (item === "Moto" && this.form2.origen.lat && this.form2.destino.lat) {
        let data;
        if (this.select_ida === "Si") {
          data = {
            origen: this.form2.origen,
            destino: this.form2.destino,
            vehiculo: item,
            ida_vuelta: true
          };
          EventBus.$emit("transpo", data);
        }
        if (!this.select_ida) {
          data = {
            origen: this.form2.origen,
            destino: this.form2.destino,
            vehiculo: item
          };
          EventBus.$emit("transpo", data);
        }
      }
    },
    ShowPolg() {
      if (this.show === true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    Clean() {
      this.flightPlanCoordinates = [];
      this.flightPlanCoordinates2 = [];
      this.zooom = 12;
      this.acep = false;
      this.ini = false;
      this.ter = false;
      this.can = false;
      this.abor = false;
      this.noa = false;
      this.pend = false;
      this.permitir = true;
      this.initialize();
    },
    editItemtrs(item) {
      Object.keys(this.formtrs).map(key => {
        if (item[key]) this.formtrs[key] = item[key];
      });
      if (item.driver && item.driver.nombre) {
        this.formtrs.driver = item.driver.nombre
      } else {
        this.formtrs.driver = ''
      }
      if (item.cliente && item.cliente.nombre) {
        this.formtrs.cliente = item.cliente.nombre
      } else {
        this.formtrs.cliente = ''
      }
      if (item.concepto && item.concepto.nombre) {
        this.formtrs.concepto = item.concepto.nombre
      } else {
        this.formtrs.concepto = ''
      }
      if (item.AzulOrderId) {
        this.azul = true
        this.formtrs.AzulOrderId = item.AzulOrderId
      } else {
        this.formtrs.AzulOrderId = ''
      }
      // if (item.payer_info) {
      //   this.paypl = true
      //   this.form.payer_info = item.payer_info
      // } else {
      //   this.form.payer_info = ''
      // }
      if (item.Azul_RRN) {
        this.azul = true
        this.formtrs.Azul_RRN = item.Azul_RRN
      } else {
        this.formtrs.Azul_RRN = ''
      }
      if (item.Azul_estatus) {
        this.azul = true
        this.formtrs.Azul_estatus = item.Azul_estatus
      } else {
        this.formtrs.Azul_estatus = ''
      }
      if (item.AzulAuthorizationCode) {
        this.azul = true
        this.formtrs.AzulAuthorizationCode = item.AzulAuthorizationCode
      } else {
        this.formtrs.AzulAuthorizationCode = ''
      }
      this.formtrs._id = item._id;
      this.dialog6 = true;
    },
    limpiar2() {
      this.hasta = "";
      this.desde = "";
      this.search2 = "";
      this.transaccionesbusq = [];
      this.transaccionesbusqres = [];
    },
    Observar(data) {
      this.permitir = false;
      this.dialog4 = true;
      setTimeout(
        function() {
          this.dialog4 = false;
          this.zooom = 12;
          this.centrarmapa = [];
          this.posicion = [];
          this.flightPlanCoordinates = [];
          this.flightPlanCoordinates2 = [];
          if (data.driver) {
            if (
              data.driver.estatus === "Viajando" &&
              data.driver.vehiculo.tipo === "Taxi"
            ) {
              this.posicion.push({ rol: "viajando", map: data.driver.map });
              this.centrarmapa.push(data.driver.map);
            }
            if (
              data.driver.estatus === "Viajando" &&
              data.driver.vehiculo.tipo === "Moto"
            ) {
              this.posicion.push({ rol: "moto", map: data.driver.map });
              this.centrarmapa.push(data.driver.map);
            }
            if (
              data.driver.estatus === "Disponible" &&
              data.driver.vehiculo.tipo === "Taxi"
            ) {
              this.posicion.push({ rol: "chofer", map: data.driver.map });
              this.centrarmapa.push(data.driver.map);
            }
            if (
              data.driver.estatus === "Disponible" &&
              data.driver.vehiculo.tipo === "Moto"
            ) {
              this.posicion.push({ rol: "motod", map: data.driver.map });
              this.centrarmapa.push(data.driver.map);
            }
          }
          if (data.user_name) {
            this.centrarmapa.push(data.origen);
            this.posicion.push({
              rol: "cliente",
              map: data.origen
            });
            this.$gmapApiPromiseLazy().then(() => {
              var bounds = new google.maps.LatLngBounds(); /* etc */
              bounds.extend(data.origen);
              this.$refs.mapa.$mapObject.fitBounds(bounds);
              this.zooom = 15;
            });
          } else {
            this.centrarmapa.push(data.user.map);
            this.posicion.push({ rol: "cliente", map: data.user.map });
            this.$gmapApiPromiseLazy().then(() => {
              var bounds = new google.maps.LatLngBounds(); /* etc */
              bounds.extend(data.user.map);
              this.$refs.mapa.$mapObject.fitBounds(bounds);
              this.zooom = 15;
            });
          }
          document.getElementById("mapa").scrollIntoView();
          document.getElementById("mapa2").scrollIntoView();
        }.bind(this),
        3000
      );
    },
    RutaConChofer(data) {
      this.permitir = false;
      this.dialog4 = true;
      setTimeout(
        function() {
          this.dialog4 = false;
          this.zooom = 12;
          this.posicion = [];
          this.flightPlanCoordinates = [];
          this.flightPlanCoordinates2 = [];
          if (data.ruta_cliente.length > 0) {
            for (let i = 0; i < data.ruta_cliente.length; i++) {
              let objeto = {
                lat: data.ruta_cliente[i].latitude,
                lng: data.ruta_cliente[i].longitude
              };
              this.flightPlanCoordinates.push(objeto);
            }
            let p1 = this.flightPlanCoordinates[
              this.flightPlanCoordinates.length - 1
            ];
            this.posicion.push({
              rol: "cliente",
              map: this.flightPlanCoordinates[0]
            });
            this.posicion.push({
              rol: "finish",
              map: p1
            });
            if (data.driver) {
              if (
                data.driver.estatus === "Viajando" &&
                data.driver.vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({
                  rol: "viajando",
                  map: data.driver.map
                });
              }
              if (
                data.driver.estatus === "Viajando" &&
                data.driver.vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({
                  rol: "moto",
                  map: data.driver.map
                });
              }
              if (
                data.driver.estatus === "Disponible" &&
                data.driver.vehiculo.tipo === "Taxi"
              ) {
                this.posicion.push({
                  rol: "chofer",
                  map: data.driver.map
                });
              }
              if (
                data.driver.estatus === "Disponible" &&
                data.driver.vehiculo.tipo === "Moto"
              ) {
                this.posicion.push({
                  rol: "motod",
                  map: data.driver.map
                });
              }
            }
            // this.posicion.push({
            //   rol: "chofer",
            //   map: data.driver.map
            // });
            // this.centrarmapa = [];
            // let tamaño = Math.round((this.flightPlanCoordinates.length + 1) / 2);
            // this.centrarmapa.push(this.flightPlanCoordinates[tamaño]);
            this.$gmapApiPromiseLazy().then(() => {
              var bounds = new google.maps.LatLngBounds(); /* etc */
              bounds.extend(this.flightPlanCoordinates[0]);
              bounds.extend(p1);
              this.$refs.mapa.$mapObject.fitBounds(bounds);
            });
            document.getElementById("mapa").scrollIntoView();
            document.getElementById("mapa2").scrollIntoView();
          } else {
            if (data.pasos_vuelta) {
              for (let i = 0; i < data.pasos.length; i++) {
                let objeto = {
                  lat: data.pasos[i].start_location.lat,
                  lng: data.pasos[i].start_location.lng
                };
                this.flightPlanCoordinates.push(objeto);
                let objeto2 = {
                  lat: data.pasos[i].end_location.lat,
                  lng: data.pasos[i].end_location.lng
                };
                this.flightPlanCoordinates.push(objeto2);
              }
              let p1 = this.flightPlanCoordinates[
                this.flightPlanCoordinates.length - 1
              ];
              for (let i = 0; i < data.pasos_vuelta.length; i++) {
                let objeto3 = {
                  lat: data.pasos_vuelta[i].start_location.lat,
                  lng: data.pasos_vuelta[i].start_location.lng
                };
                this.flightPlanCoordinates2.push(objeto3);
                let objeto4 = {
                  lat: data.pasos_vuelta[i].end_location.lat,
                  lng: data.pasos_vuelta[i].end_location.lng
                };
                this.flightPlanCoordinates2.push(objeto4);
              }
              this.posicion.push({
                rol: "cliente",
                map: this.flightPlanCoordinates[0]
              });
              this.posicion.push({
                rol: "stop",
                map: p1
              });
              if (data.driver) {
                if (
                  data.driver.estatus === "Viajando" &&
                  data.driver.vehiculo.tipo === "Taxi"
                ) {
                  this.posicion.push({
                    rol: "viajando",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Viajando" &&
                  data.driver.vehiculo.tipo === "Moto"
                ) {
                  this.posicion.push({
                    rol: "moto",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Disponible" &&
                  data.driver.vehiculo.tipo === "Taxi"
                ) {
                  this.posicion.push({
                    rol: "chofer",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Disponible" &&
                  data.driver.vehiculo.tipo === "Moto"
                ) {
                  this.posicion.push({
                    rol: "motod",
                    map: data.driver.map
                  });
                }
              }
              this.$gmapApiPromiseLazy().then(() => {
                var bounds = new google.maps.LatLngBounds(); /* etc */
                bounds.extend(this.flightPlanCoordinates[0]);
                bounds.extend(p1);
                this.$refs.mapa.$mapObject.fitBounds(bounds);
              });
            } else {
              for (let i = 0; i < data.pasos.length; i++) {
                let objeto = {
                  lat: data.pasos[i].start_location.lat,
                  lng: data.pasos[i].start_location.lng
                };
                this.flightPlanCoordinates.push(objeto);
                let objeto2 = {
                  lat: data.pasos[i].end_location.lat,
                  lng: data.pasos[i].end_location.lng
                };
                this.flightPlanCoordinates.push(objeto2);
              }
              let p1 = this.flightPlanCoordinates[
                this.flightPlanCoordinates.length - 1
              ];
              this.posicion.push({
                rol: "cliente",
                map: this.flightPlanCoordinates[0]
              });
              this.posicion.push({
                rol: "finish",
                map: p1
              });
              if (data.driver) {
                if (
                  data.driver.estatus === "Viajando" &&
                  data.driver.vehiculo.tipo === "Taxi"
                ) {
                  this.posicion.push({
                    rol: "viajando",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Viajando" &&
                  data.driver.vehiculo.tipo === "Moto"
                ) {
                  this.posicion.push({
                    rol: "moto",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Disponible" &&
                  data.driver.vehiculo.tipo === "Taxi"
                ) {
                  this.posicion.push({
                    rol: "chofer",
                    map: data.driver.map
                  });
                }
                if (
                  data.driver.estatus === "Disponible" &&
                  data.driver.vehiculo.tipo === "Moto"
                ) {
                  this.posicion.push({
                    rol: "motod",
                    map: data.driver.map
                  });
                }
              }
              this.$gmapApiPromiseLazy().then(() => {
                var bounds = new google.maps.LatLngBounds(); /* etc */
                bounds.extend(this.flightPlanCoordinates[0]);
                bounds.extend(p1);
                this.$refs.mapa.$mapObject.fitBounds(bounds);
              });
            }
            // this.posicion.push({
            //   rol: "chofer",
            //   map: data.driver.map
            // });
            // this.centrarmapa = [];
            // let tamaño = Math.round((this.flightPlanCoordinates.length + 1) / 2);
            // this.centrarmapa.push(this.flightPlanCoordinates[tamaño]);
            document.getElementById("mapa").scrollIntoView();
            document.getElementById("mapa2").scrollIntoView();
          }
        }.bind(this),
        3000
      );
    },
    Ruta(data, estatus) {
      this.permitir = false;
      this.dialog4 = true;
      setTimeout(
        function() {
          this.dialog4 = false;
          this.zooom = 12;
          this.posicion = [];
          this.flightPlanCoordinates = [];
          this.flightPlanCoordinates2 = [];
          if (data.ruta_cliente.length > 0 && estatus !== "Terminado") {
            for (let i = 0; i < data.ruta_cliente.length; i++) {
              let objeto = {
                lat: data.ruta_cliente[i].latitude,
                lng: data.ruta_cliente[i].longitude
              };
              this.flightPlanCoordinates.push(objeto);
            }
            let p1 = this.flightPlanCoordinates[
              this.flightPlanCoordinates.length - 1
            ];
            this.posicion.push({
              rol: "cliente",
              map: this.flightPlanCoordinates[0]
            });
            this.posicion.push({
              rol: "finish",
              map: p1
            });
            // this.centrarmapa = [];
            // let tamaño = Math.round((this.flightPlanCoordinates.length + 1) / 2);
            // this.centrarmapa.push(this.flightPlanCoordinates[tamaño]);
            this.$gmapApiPromiseLazy().then(() => {
              var bounds = new google.maps.LatLngBounds(); /* etc */
              bounds.extend(this.flightPlanCoordinates[0]);
              bounds.extend(p1);
              this.$refs.mapa.$mapObject.fitBounds(bounds);
            });
            document.getElementById("mapa").scrollIntoView();
            document.getElementById("mapa2").scrollIntoView();
          } else {
            if (estatus === "Terminado") {
              if (data.puntos && data.puntos.length > 0) {
                let objeto2 = {
                  lat: data.origen.lat,
                  lng: data.origen.lng
                };
                this.flightPlanCoordinates.push(objeto2);
                for (let i = 0; i < data.puntos.length; i++) {
                  let objeto = {
                    lat: data.puntos[i].lat,
                    lng: data.puntos[i].lng
                  };
                  this.flightPlanCoordinates.push(objeto);
                }
                let p1 = this.flightPlanCoordinates[
                  this.flightPlanCoordinates.length - 1
                ];
                this.posicion.push({
                  rol: "cliente",
                  map: this.flightPlanCoordinates[0]
                });
                this.posicion.push({
                  rol: "stop",
                  map: p1
                });
                this.$gmapApiPromiseLazy().then(() => {
                  var bounds = new google.maps.LatLngBounds(); /* etc */
                  bounds.extend(p1);
                  bounds.extend(this.flightPlanCoordinates[0]);
                  this.$refs.mapa.$mapObject.fitBounds(bounds);
                });
              } else {
                let objeto = {
                  lat: data.origen.lat,
                  lng: data.origen.lng
                };
                this.flightPlanCoordinates.push(objeto);
                let objeto2 = {
                  lat: data.origen.lat,
                  lng: data.origen.lng
                };
                this.flightPlanCoordinates.push(objeto2);
                let p1 = this.flightPlanCoordinates[
                  this.flightPlanCoordinates.length - 1
                ];
                this.posicion.push({
                  rol: "cliente",
                  map: this.flightPlanCoordinates[0]
                });
                this.posicion.push({
                  rol: "stop",
                  map: p1
                });
                this.$gmapApiPromiseLazy().then(() => {
                  var bounds = new google.maps.LatLngBounds(); /* etc */
                  bounds.extend(p1);
                  bounds.extend(this.flightPlanCoordinates[0]);
                  this.$refs.mapa.$mapObject.fitBounds(bounds);
                });
              }
            } else {
              if (data.pasos_vuelta) {
                for (let i = 0; i < data.pasos.length; i++) {
                  let objeto = {
                    lat: data.pasos[i].start_location.lat,
                    lng: data.pasos[i].start_location.lng
                  };
                  this.flightPlanCoordinates.push(objeto);
                  let objeto2 = {
                    lat: data.pasos[i].end_location.lat,
                    lng: data.pasos[i].end_location.lng
                  };
                  this.flightPlanCoordinates.push(objeto2);
                }
                let p1 = this.flightPlanCoordinates[
                  this.flightPlanCoordinates.length - 1
                ];
                for (let i = 0; i < data.pasos_vuelta.length; i++) {
                  let objeto3 = {
                    lat: data.pasos_vuelta[i].start_location.lat,
                    lng: data.pasos_vuelta[i].start_location.lng
                  };
                  this.flightPlanCoordinates2.push(objeto3);
                  let objeto4 = {
                    lat: data.pasos_vuelta[i].end_location.lat,
                    lng: data.pasos_vuelta[i].end_location.lng
                  };
                  this.flightPlanCoordinates2.push(objeto4);
                }
                this.posicion.push({
                  rol: "cliente",
                  map: this.flightPlanCoordinates[0]
                });
                this.posicion.push({
                  rol: "stop",
                  map: p1
                });
                this.$gmapApiPromiseLazy().then(() => {
                  var bounds = new google.maps.LatLngBounds(); /* etc */
                  bounds.extend(p1);
                  bounds.extend(this.flightPlanCoordinates[0]);
                  this.$refs.mapa.$mapObject.fitBounds(bounds);
                });
              } else {
                for (let i = 0; i < data.pasos.length; i++) {
                  let objeto = {
                    lat: data.pasos[i].start_location.lat,
                    lng: data.pasos[i].start_location.lng
                  };
                  this.flightPlanCoordinates.push(objeto);
                  let objeto2 = {
                    lat: data.pasos[i].end_location.lat,
                    lng: data.pasos[i].end_location.lng
                  };
                  this.flightPlanCoordinates.push(objeto2);
                }
                let p1 = this.flightPlanCoordinates[
                  this.flightPlanCoordinates.length - 1
                ];
                this.posicion.push({
                  rol: "cliente",
                  map: this.flightPlanCoordinates[0]
                });
                this.posicion.push({
                  rol: "finish",
                  map: p1
                });
                this.$gmapApiPromiseLazy().then(() => {
                  var bounds = new google.maps.LatLngBounds(); /* etc */
                  bounds.extend(this.flightPlanCoordinates[0]);
                  bounds.extend(p1);
                  this.$refs.mapa.$mapObject.fitBounds(bounds);
                });
              }
              this.centrarmapa = [];
              let tamaño = Math.round((this.flightPlanCoordinates.length + 1) / 2);
              this.centrarmapa.push(this.flightPlanCoordinates[tamaño]);
            }
            document.getElementById("mapa").scrollIntoView();
            document.getElementById("mapa2").scrollIntoView();
          }
          // this.flightPlanCoordinates = [
          //   { c: 37.772, lng: -122.214 },
          //   { lat: 21.291, lng: -157.821 },
          //   { lat: -18.142, lng: 178.431 },
          //   { lat: -27.467, lng: 153.027 }
          // ];
        }.bind(this),
        3000
      );
    },
    sockt() {
      this.polygono = [];
      Api.get("geocerca/admin/seguimiento")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].polygono.length; j++) {
              this.polygono.push({
                id: res.data[i]._id,
                nombre: res.data[i].nombre,
                costo_s: res.data[i].costo_salida,
                costo_d: res.data[i].costo_destino,
                choferes: res.data[i].choferes,
                perimetro: res.data[i].perimetro,
                info: res.data[i].polygono[j]
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      Api.get("cliente/admin/seguimiento").then(res => {
        this.clientes = res.data;
      });
      Api.get("reserva/admin/seguimiento").then(res => {
        this.transacciones = res.data;
        for (let i = 0; i < this.transacciones.length; i++) {
          if (this.transacciones[i].costo) {
            this.transacciones[i].costo =
              "RD$ " +
              Math.round(this.transacciones[i].costo)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].costo = "RD$ " + 0;
          }
          if (this.transacciones[i].user && !this.transacciones[i].user_name) {
            this.transacciones[i].fullname = this.transacciones[i].user.nombre + " " + this.transacciones[i].user.apellido;
          } else {
            if (this.transacciones[i].user_name) {
              this.transacciones[i].fullname = this.transacciones[i].user_name;
            }
          }
          if (this.transacciones[i].driver) {
            this.transacciones[i].fullnameD = this.transacciones[i].driver.nombre + " " + this.transacciones[i].driver.apellido;
          }
        }
        // this.transacciones.sort(function(a, b) {
        //   return a>b ? -1 : a<b ? 1 : 0;
        // });
      });
      Api.get("chofer/admin/seguimiento").then(res => {
        this.choferes = [];
        this.choferesres = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Disponible" ||
            res.data[i].estatus === "Viajando"
          ) {
            this.choferes.push(res.data[i]);
            this.choferesres.push(res.data[i]);
          }
        }
        this.cantt = this.choferesres.length
        this.posicion = [];
        this.flightPlanCoordinates = [];
        for (let i = 0; i < this.choferes.length; i++) {
          if (
            this.choferes[i].estatus === "Viajando" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
          ) {
            this.posicion.push({ rol: "viajando", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Viajando" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
          ) {
            this.posicion.push({ rol: "moto", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Disponible" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
          ) {
            this.posicion.push({ rol: "chofer", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Disponible" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
          ) {
            this.posicion.push({ rol: "motod", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
        }
      });
    },
    initialize() {
      this.time = null;
      this.date = null;
      this.reservacion = "No";
      document.getElementById("puntmark").hidden = true;
      document.getElementById("idvuelta").hidden = true;
      this.select_ida = "";
      document.getElementById("salida").disabled = false;
      document.getElementById("llegada").disabled = false;
      document.getElementById("resv").hidden = true;
      document.getElementById("salida").hidden = false;
      document.getElementById("llegada").hidden = false;
      this.centermap = { lat: 18.492144, lng: -69.942564 };
      this.dialog = false;
      this.punto_reserva = [];
      this.show = true;
      this.zooom = 12;
      this.centrarmapa = [];
      this.polygono = [];
      Api.get("trans/admin").then(res => {
        this.transacciones2 = res.data;
        for (let i = 0; i < this.transacciones2.length; i++) {
          if (this.transacciones2[i].debe) {
            this.transacciones2[i].debe =
              "RD$ " +
              Math.round(this.transacciones2[i].debe)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones2[i].debe = "RD$ " + 0;
          }
          if (this.transacciones2[i].haber) {
            this.transacciones2[i].haber =
              "RD$ " +
              Math.round(this.transacciones2[i].haber)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones2[i].haber = "RD$ " + 0;
          }
          if (this.transacciones2[i].comision) {
            this.transacciones2[i].comision =
              "RD$ " +
              Math.round(this.transacciones2[i].comision)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones2[i].comision = "RD$ " + 0;
          }
          if (this.transacciones2[i].total) {
            this.transacciones2[i].total =
              "RD$ " +
              Math.round(this.transacciones2[i].total)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones2[i].total = "RD$ " + 0;
          }
        }
      });
      Api.get("geocerca/admin/seguimiento")
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].polygono.length; j++) {
              this.polygono.push({
                id: res.data[i]._id,
                nombre: res.data[i].nombre,
                costo_s: res.data[i].costo_salida,
                costo_d: res.data[i].costo_destino,
                choferes: res.data[i].choferes,
                perimetro: res.data[i].perimetro,
                info: res.data[i].polygono[j]
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      Api.get("cliente/admin/seguimiento").then(res => {
        this.clientes = res.data;
      });
      Api.get("reserva/admin/seguimiento").then(res => {
        this.transacciones = res.data;
        for (let i = 0; i < this.transacciones.length; i++) {
          if (this.transacciones[i].costo) {
            this.transacciones[i].costo =
              "RD$ " +
              Math.round(this.transacciones[i].costo)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          } else {
            this.transacciones[i].costo = "RD$ " + 0;
          }
          if (this.transacciones[i].user && !this.transacciones[i].user_name) {
            this.transacciones[i].fullname = this.transacciones[i].user.nombre + " " + this.transacciones[i].user.apellido;
          } else {
            if (this.transacciones[i].user_name) {
              this.transacciones[i].fullname = this.transacciones[i].user_name;
            }
          }
          if (this.transacciones[i].driver) {
            this.transacciones[i].fullnameD = this.transacciones[i].driver.nombre + " " + this.transacciones[i].driver.apellido;
          }
        }
        console.log(this.transacciones)
      });
      Api.get("extra/admin").then(res => {
        this.extras = [];
        for (let i = 0; i < res.data.length; i++) {
          this.extras.push(res.data[i].nombre);
        }
      });
      this.actualizarchof()
      // Api.get("chofer/admin/seguimiento").then(res => {
      //   this.choferes = [];
      //   this.choferesres = [];
      //   for (let i = 0; i < res.data.length; i++) {
      //     if (
      //       res.data[i].estatus === "Disponible" ||
      //       res.data[i].estatus === "Viajando"
      //     ) {
      //       this.choferes.push(res.data[i]);
      //       this.choferesres.push(res.data[i]);
      //     }
      //   }
      //   this.cantt = this.choferesres.length
      //   this.posicion = [];
      //   this.flightPlanCoordinates = [];
      //   this.centrarmapa = [];
      //   this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
      //   this.zooom = 12;
      //   for (let i = 0; i < this.choferes.length; i++) {
      //     if (
      //       this.choferes[i].estatus === "Viajando" &&
      //       this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
      //     ) {
      //       this.posicion.push({ rol: "viajando", map: this.choferes[i].map });
      //       this.centrarmapa.push(this.choferes[i].map);
      //     }
      //     if (
      //       this.choferes[i].estatus === "Viajando" &&
      //       this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
      //     ) {
      //       this.posicion.push({ rol: "moto", map: this.choferes[i].map });
      //       this.centrarmapa.push(this.choferes[i].map);
      //     }
      //     if (
      //       this.choferes[i].estatus === "Disponible" &&
      //       this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
      //     ) {
      //       this.posicion.push({ rol: "chofer", map: this.choferes[i].map });
      //       this.centrarmapa.push(this.choferes[i].map);
      //     }
      //     if (
      //       this.choferes[i].estatus === "Disponible" &&
      //       this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
      //     ) {
      //       this.posicion.push({ rol: "motod", map: this.choferes[i].map });
      //       this.centrarmapa.push(this.choferes[i].map);
      //     }
      //   }
      // });
    },
    actualizarchof() {
      Api.get("chofer/admin/seguimiento").then(res => {
        this.choferes = [];
        this.choferesres = [];
        if (this.permitir) {
          setTimeout(
            function() {
              this.actualizarchof();
            }.bind(this),
            2000
          );
        }
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Disponible" ||
            res.data[i].estatus === "Viajando"
          ) {
            this.choferes.push(res.data[i]);
            this.choferesres.push(res.data[i]);
          }
        }
        this.cantt = this.choferesres.length
        this.posicion = [];
        this.flightPlanCoordinates = [];
        this.centrarmapa = [];
        this.centrarmapa.push({ lat: 18.4718609, lng: -69.8923187 });
        for (let i = 0; i < this.choferes.length; i++) {
          if (
            this.choferes[i].estatus === "Viajando" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
          ) {
            this.posicion.push({ rol: "viajando", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Viajando" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
          ) {
            this.posicion.push({ rol: "moto", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Disponible" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Taxi"
          ) {
            this.posicion.push({ rol: "chofer", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
          if (
            this.choferes[i].estatus === "Disponible" &&
            this.choferes[i].vehiculo && this.choferes[i].vehiculo.tipo === "Moto"
          ) {
            this.posicion.push({ rol: "motod", map: this.choferes[i].map });
            this.centrarmapa.push(this.choferes[i].map);
          }
        }
        this.zooom = 12;
      });
    },
    openInfoWindowTemplate(item) {
      this.infoWindow.position = item.info[0][0];
      this.infoWindow.open = true;
      this.info = item;
    },
    Pendiente(datos, label) {
      if (
        this.pend === true ||
        this.acep === true ||
        this.ini === true ||
        this.ter === true ||
        this.can === true ||
        this.abor === true ||
        this.noa === true
      ) {
        let trans = [];
        Api.get("reserva/admin/seguimiento").then(res => {
          trans = res.data;
          for (let i = 0; i < trans.length; i++) {
            if (trans[i].costo) {
              trans[i].costo =
                "RD$ " +
                Math.round(trans[i].costo)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            } else {
              trans[i].costo = "RD$ " + 0;
            }
          }
          this.contador++;
          if (this.contador === 1) {
            this.transaccionesres = [];
            for (let i = 0; i < trans.length; i++) {
              this.transaccionesres.push(trans[i]);
            }
            this.transacciones = [];
          }
          if (datos === true) {
            for (let i = 0; i < this.transaccionesres.length; i++) {
              if (this.transaccionesres[i].estatus === label) {
                this.transacciones.push(this.transaccionesres[i]);
              }
            }
          } else {
            // console.log(this.transacciones)
            for (let i = 0; i < this.transacciones.length; i++) {
              if (this.transacciones[i].estatus === label) {
                this.transacciones.splice(i, 1);
                i = 0;
              }
            }
            for (let i = 0; i < this.transacciones.length; i++) {
              if (this.transacciones[i].estatus === label) {
                this.transacciones.splice(i, 1);
                i = 0;
              }
            }
          }
        });
      }
      if (
        this.pend === false &&
        this.acep === false &&
        this.ini === false &&
        this.ter === false &&
        this.can === false &&
        this.abor === false &&
        this.noa === false
      ) {
        this.contador = 0;
        this.initialize();
      }
    },
    Pendiente2(datos, label) {
      if (
        this.pend2 === true ||
        this.acep2 === true ||
        this.ini2 === true ||
        this.ter2 === true ||
        this.can2 === true ||
        this.abor2 === true ||
        this.noa2 === true
      ) {
        this.contador2++;
        if (this.contador2 === 1) {
          this.transaccionesbusq = [];
        }
        if (datos === true) {
          for (let i = 0; i < this.transaccionesbusqres.length; i++) {
            if (this.transaccionesbusqres[i].estatus === label) {
              this.transaccionesbusq.push(this.transaccionesbusqres[i]);
            }
          }
        } else {
          for (let i = 0; i < this.transaccionesbusq.length; i++) {
            if (this.transaccionesbusq[i].estatus === label) {
              this.transaccionesbusq.splice(i, 1);
              i = 0;
            }
          }
          for (let i = 0; i < this.transaccionesbusq.length; i++) {
            if (this.transaccionesbusq[i].estatus === label) {
              this.transaccionesbusq.splice(i, 1);
              i = 0;
            }
          }
        }
      }
      if (
        this.pend2 === false &&
        this.acep2 === false &&
        this.ini2 === false &&
        this.ter2 === false &&
        this.can2 === false &&
        this.abor2 === false &&
        this.noa2 === false
      ) {
        this.contador2 = 0;
        this.transaccionesbusq = this.transaccionesbusqres;
      }
    },
    // Pendiente(datos, label) {
    //   if (label === "Pendiente") {
    //     this.acep = false;
    //     this.ini = false;
    //     this.ter = false;
    //     this.can = false;
    //     this.abor = false;
    //     this.noa = false;
    //   }
    //   if (label === "Aceptada") {
    //     this.pend = false;
    //     this.ini = false;
    //     this.ter = false;
    //     this.can = false;
    //     this.abor = false;
    //     this.noa = false;
    //   }
    //   if (label === "Iniciado") {
    //     this.acep = false;
    //     this.pend = false;
    //     this.ter = false;
    //     this.can = false;
    //     this.abor = false;
    //     this.noa = false;
    //   }
    //   if (label === "Terminado") {
    //     this.acep = false;
    //     this.ini = false;
    //     this.pend = false;
    //     this.can = false;
    //     this.abor = false;
    //     this.noa = false;
    //   }
    //   if (label === "Cancelada") {
    //     this.acep = false;
    //     this.ini = false;
    //     this.ter = false;
    //     this.pend = false;
    //     this.abor = false;
    //     this.noa = false;
    //   }
    //   if (label === "Abortada") {
    //     this.acep = false;
    //     this.ini = false;
    //     this.ter = false;
    //     this.can = false;
    //     this.pend = false;
    //     this.noa = false;
    //   }
    //   if (label === "No atendida") {
    //     this.acep = false;
    //     this.ini = false;
    //     this.ter = false;
    //     this.can = false;
    //     this.pend = false;
    //     this.abor = false;
    //   }
    //   this.transacciones = [];
    //   if (datos === true) {
    //     Api.get("reserva/admin/seguimiento").then(res => {
    //       for (let i = 0; i < res.data.length; i++) {
    //         if (res.data[i].estatus === label && res.data[i].user_name) {
    //           let objeto = {
    //             destino: res.data[i].destino,
    //             driver: res.data[i].driver,
    //             estatus: res.data[i].estatus,
    //             horaIni: res.data[i].horaIni,
    //             distancia: res.data[i].distancia,
    //             ruta_cliente: res.data[i].ruta_cliente,
    //             horaTerm: res.data[i].horaTerm,
    //             negados: res.data[i].negados,
    //             user_name: res.data[i].user_name,
    //             user_lastname: res.data[i].user_lastname,
    //             user_tlf: res.data[i].user_tlf,
    //             costo:
    //               "RD$ " +
    //               Math.round(res.data[i].costo)
    //                 .toString()
    //                 .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
    //             origen: res.data[i].origen,
    //             pasos: res.data[i].pasos,
    //             pasos_vuelta: res.data[i].pasos_vuelta,
    //             polyline: res.data[i].polyline,
    //             _id: res.data[i]._id,
    //             user: res.data[i].user
    //           };
    //           if (objeto.costo === "RD$ NaN") {
    //             objeto.costo = "RD$ 0";
    //           }
    //           this.transacciones.push(objeto);
    //         } else {
    //           if (res.data[i].estatus === label) {
    //             let objeto = {
    //               destino: res.data[i].destino,
    //               driver: res.data[i].driver,
    //               estatus: res.data[i].estatus,
    //               distancia: res.data[i].distancia,
    //               horaIni: res.data[i].horaIni,
    //               ruta_cliente: res.data[i].ruta_cliente,
    //               horaTerm: res.data[i].horaTerm,
    //               negados: res.data[i].negados,
    //               costo:
    //                 "RD$ " +
    //                 Math.round(res.data[i].costo)
    //                   .toString()
    //                   .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
    //               origen: res.data[i].origen,
    //               pasos: res.data[i].pasos,
    //               polyline: res.data[i].polyline,
    //               _id: res.data[i]._id,
    //               user: res.data[i].user
    //             };
    //             if (objeto.costo === "RD$ NaN") {
    //               objeto.costo = "RD$ 0";
    //             }
    //             this.transacciones.push(objeto);
    //           }
    //         }
    //       }
    //     });
    //   } else {
    //     this.initialize();
    //   }
    // },
    close5() {
      this.formtrs = Object.assign({}, this.defaultFormtrs);
      this.dialog6 = false;
      this.azul = false
    },
    close() {
      document.getElementById("resv").hidden = true;
      this.form = Object.assign({}, this.defaultForm);
      this.dialog = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.transacciones.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      this.form._id = item._id;
      this.dialog = true;
    }
  }
};
</script>
<style lang="scss">
.theme--light.v-tabs__bar {
  display: flex !important;
  justify-content: center !important;
}
.v-tabs__slider.accent {
  background-color: #e84646 !important;
  border-color: #e84646 !important;
}
</style>
