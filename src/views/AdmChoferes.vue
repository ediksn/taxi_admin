<template lang="pug">
div(style="margin-top: -24px;margin-left: -15px;margin-right: -15px;")
  #AdmChoferes
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12)
        v-card(color='', style="border-radius:5px;background-color: #e84646;")
            v-card-title.justify-center
              img(src='../assets/logo.png', with='60' ,height='60')
        v-card(color='', style="border-radius:5px;background-color: #d6d6d6")
            v-card-title(style="padding: 7px;").justify-center
                span.black--text  Administración de Choferes
        v-btn(v-if='cre').mb-2(style="border-radius:5px;background-color: #e84646;" @click='dialog2 = true') Nuevo Chofer
    v-dialog(v-model='dialogcarro', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Vehiculo
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-text-field(id="modelo"
                            outline
                            required
                            v-model="formveh2.modelo"
                            prepend-inner-icon="local_taxi"
                            label="Modelo:")

                            v-text-field(id="placa"
                            outline
                            required
                            v-model="formveh2.placa"
                            prepend-inner-icon="local_taxi"
                            label="Placa:")

                            v-text-field(id="color"
                            outline
                            required
                            v-model="formveh2.color"
                            prepend-inner-icon="local_taxi"
                            label="Color:")

                            v-select(id="accion"
                            outline
                            :items="optveh"
                            v-model="formveh2.tipo"
                            prepend-inner-icon="local_taxi",
                            required
                            label="Seleccione el tipo de vehículo:")

                            //- v-text-field(id="tipo"
                            //- v-model="formveh.tipo"
                            //- outline
                            //- required
                            //- prepend-inner-icon="local_taxi"
                            //- label="Tipo:")

                            v-select(id="accion"
                            outline
                            :items="options"
                            multiple
                            v-model="formveh2.extras"
                            prepend-inner-icon="star_half",
                            required
                            label="Seleccione los extras:")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:20px;")
                              v-card-title.justify-center
                                span Fotos del Vehiculo

                            div(v-for='(item,i) in formveh2.images' style='position:relative')
                                v-btn(@click="indice(i, item.imageName)",color='error', style='border-radius:0px;background: #cc0707;padding:0px;margin-top:0px;min-width: 25px;right:0;position:absolute;z-index:1000') X
                                a(:href="item.imageUrl" target="_blank" v-if='item.imageUrl')
                                  img(:src='item.imageUrl', width='100%' height='100%', v-if='item.imageUrl')
                            v-text-field(outline, label='Seleccione las fotos del vehiculo', @click='pickFile_Veh',  prepend-inner-icon='attach_file', multiple)
                            input(
                                type="file"
                                style="display: none"
                                ref="image_veh"
                                accept="image/*"
                                @change="onFilePicked_Veh"
                                multiple)

                            div
                                v-flex(v-if="loading === true", xs12 sm12 md12)
                                  v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                    v-progress-circular(indeterminate='', color='primary')
                                v-flex(v-if="loading === false", xs12 sm12 md12)
                                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                        v-btn(style="background:red;border-radius:10px;", @click.native='guardarvehiculo') Guardar
                                        v-btn(style="background:#252525;border-radius:10px;", @click.native='close') Salir
    v-dialog(v-model='dialog2', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Chofer
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="Nombre2"
                                outline
                                required
                                v-model="form3.nombre"
                                prepend-inner-icon="person"
                                label="Nombre:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Apellido2"
                                outline
                                required
                                v-model="form3.apellido"
                                prepend-inner-icon="person"
                                label="Apellido:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Identificacion2"
                                outline
                                required
                                mask="###############################"
                                v-model="form3.identificacion"
                                prepend-inner-icon="person"
                                label="Identificacion:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Email2"
                                v-model="form3.email"
                                outline
                                required
                                :rules="[rules.email]"
                                prepend-inner-icon="email"
                                label="Email:"
                                style="height: 56px;")
                                
                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Telefono2"
                                outline
                                required
                                mask="phone"
                                v-model="form3.telefono"
                                prepend-inner-icon="phone"
                                label="Telefono:"
                                style="height: 56px;")

                            v-card(v-if="pass === true", style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Password2"
                                outline
                                :type="show1 ? 'text' : 'password'"
                                counter
                                required
                                v-model="form3.password"
                                prepend-inner-icon="lock"
                                label="Contraseña:"
                                style="height: 56px;")

                            v-card(v-if="pass === false", style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Password2"
                                outline
                                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                :type="show1 ? 'text' : 'password'"
                                counter
                                @click:append="show1 = !show1"
                                required
                                v-model="form3.password"
                                prepend-inner-icon="lock"
                                label="Contraseña:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-textarea(id="Dirección2"
                                outline
                                required
                                v-model="form3.direccion"
                                prepend-inner-icon="place"
                                label="Dirección:"
                                style="height: 133px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="unidad"
                                outline
                                required
                                v-model="form3.unidad"
                                prepend-inner-icon="local_taxi"
                                label="Unidad:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:10px;")
                              v-card-title.justify-center
                                span Foto de Perfil

                            div
                              a(:href="ruta + img_per" target="_blank" v-if='img_per && !form3.imagen.imageUrl')
                                img(:src='ruta + img_per', height='100%', width='100%')
                              img(:src='form3.imagen.imageUrl', height='100%', width='100%', v-if='form3.imagen.imageUrl')
                            v-text-field(outline label='Seleccione la imagen', @click='pickFile_Per', v-model='form3.imagen.imageName', prepend-inner-icon='attach_file')
                            input(
                              type="file"
                              style="display: none;"
                              ref="image_per"
                              accept="image/*"
                              @change="onFilePicked_Per")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:10px;")
                              v-card-title.justify-center
                                span Foto de Identificación
                            div
                              a(:href="ruta + img_ide" target="_blank" v-if='img_ide && !form3.identific.imageUrl')
                                img(:src='ruta + img_ide', height='100%', width='100%')
                              img(:src='form3.identific.imageUrl', height='100%', width='100%', v-if='form3.identific.imageUrl')
                            v-text-field(outline label='Seleccione la identificación', @click='pickFile_Iden', v-model='form3.identific.imageName', prepend-inner-icon='attach_file')
                            input(
                              type="file"
                              style="display: none;"
                              ref="image"
                              accept="image/*"
                              @change="onFilePicked_Iden")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:10px;")
                              v-card-title.justify-center
                                span Foto de la Matrícula
                            div
                              a(:href="ruta + img_mat" target="_blank" v-if='img_mat && !form3.matricula.imageUrl')
                                img(:src='ruta + img_mat', height='100%', width='100%')
                              img(:src='form3.matricula.imageUrl', height='100%', width='100%', v-if='form3.matricula.imageUrl')
                            v-text-field(outline label='Seleccione la matrícula', @click='pickFile_Mat', v-model='form3.matricula.imageName', prepend-inner-icon='attach_file')
                            input(
                              type="file"
                              style="display: none;"
                              ref="image_mat"
                              accept="image/*"
                              @change="onFilePicked_Mat")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:10px;")
                              v-card-title.justify-center
                                span Foto de la Licencia

                            div
                              a(:href="ruta + img_lic" target="_blank" v-if='img_lic && !form3.licencia.imageUrl')
                                img(:src='ruta + img_lic', height='100%', width='100%')
                              img(:src='form3.licencia.imageUrl', height='100%', width='100%', v-if='form3.licencia.imageUrl')
                            v-text-field(outline label='Seleccione la licencia', @click='pickFile_Lic', v-model='form3.licencia.imageName', prepend-inner-icon='attach_file')
                            input(
                              type="file"
                              style="display: none;"
                              ref="image_lic"
                              accept="image/*"
                              @change="onFilePicked_Lic")

                            v-card(style="margin-right: 0px;margin-top: 10px;margin-bottom:10px;")
                              v-card-title.justify-center
                                span Foto del Seguro
                            div
                              a(:href="ruta + img_seg" target="_blank" v-if='img_seg && !form3.seguro.imageUrl')
                                img(:src='ruta + img_seg', height='100%', width='100%')
                              img(:src='form3.seguro.imageUrl', height='100%', width='100%', v-if='form3.seguro.imageUrl')
                            v-text-field(outline label='Seleccione el seguro', @click='pickFile_Seg', v-model='form3.seguro.imageName', prepend-inner-icon='attach_file')
                            input(
                              type="file"
                              style="display: none;"
                              ref="image_seg"
                              accept="image/*"
                              @change="onFilePicked_Seg")

                            div
                              v-flex(v-if="loading === true", xs12 sm12 md12)
                                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                  v-progress-circular(indeterminate='', color='primary')
                              v-flex(v-if="loading === false", xs12 sm12 md12)
                                v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                                  v-btn(style="background: #e84646;border-radius:10px;", @click="guardar()") Guardar
                                  v-btn(style="background:grey;border-radius:10px;", @click.native='close') Salir

    v-dialog(v-model='dialog', persistent max-width='1028px')
          v-container(style='background-color:white !important;max-width: 1028px;')
            v-card-title.justify-center
                span.headline Chofer
            div(style="margin-top: 20px;")
                v-flex(xs12 sm12)
                    v-layout(align-start='', justify-center='', row='', wrap fill-height='')
                        v-flex(xs6)
                          v-form(enctype="multipart/form-data")
                            v-card(style="margin-right: 0px;")
                                v-text-field(id="Nombre"
                                outline
                                required
                                disabled
                                v-model="form.nombre"
                                prepend-inner-icon="person"
                                label="Nombre:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Apellido"
                                outline
                                required
                                disabled
                                v-model="form.apellido"
                                prepend-inner-icon="person"
                                label="Apellido:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Identificacion"
                                outline
                                required
                                disabled
                                mask="###############################"
                                v-model="form.identificacion"
                                prepend-inner-icon="person"
                                label="Identificacion:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Email"
                                v-model="form.email"
                                outline
                                disabled
                                required
                                :rules="[rules.email]"
                                prepend-inner-icon="email"
                                label="Email:"
                                style="height: 56px;")
                                
                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Telefono"
                                outline
                                required
                                disabled
                                mask="phone"
                                v-model="form.telefono"
                                prepend-inner-icon="phone"
                                label="Telefono:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-textarea(id="Dirección"
                                outline
                                required
                                disabled
                                v-model="form.direccion"
                                prepend-inner-icon="place"
                                label="Dirección:"
                                style="height: 133px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Detalles del Vehículo

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="modelo"
                                outline
                                required
                                disabled
                                v-model="formveh.modelo"
                                prepend-inner-icon="local_taxi"
                                label="Modelo:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="placa"
                                outline
                                required
                                disabled
                                v-model="formveh.placa"
                                prepend-inner-icon="local_taxi"
                                label="Placa:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="color"
                                outline
                                required
                                disabled
                                v-model="formveh.color"
                                prepend-inner-icon="local_taxi"
                                label="Color:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="tipo"
                                v-model="formveh.tipo"
                                outline
                                required
                                disabled
                                prepend-inner-icon="local_taxi"
                                label="Tipo:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;border: 2px solid;border-color: #757575;")
                                div(style="display: flex;margin-left: 12px;margin-top:10px").justify-start
                                  v-icon(color='grey') star_half
                                  span(style="margin-left: 5px;").grey--text <b> Extras: </b>
                                div(style="display: flex;margin-left: 42px;",v-for="item in formveh.extras").justify-start
                                  h5(style="line-height: 0.5 !important;").grey--text - {{item}}

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Foto del Chofer
                            v-card(v-if="form.imagen.url",style="margin-right: 0px;margin-top: 10px;", :id="form.imagen.url")
                              v-card(:id="form.imagen.url + 3", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(form.imagen.status) }")
                                v-card(v-if="form.imagen.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.imagen.status}}
                                v-card(v-if="form.imagen.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.imagen.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(form.imagen, 1, "imagen")') Modificar
                              v-btn(:id="form.imagen.url+'1'", @click="aceptardocument(form.imagen, 1, 'imagen')",color='green', v-bind:class="{ ocultar: ocultar2(form.imagen.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="form.imagen.url+'2'", @click="rechazardocument(form.imagen, 1, 'imagen')",color='error', v-bind:class="{ ocultar: ocultar2(form.imagen.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + form.imagen.url" target="_blank")
                                img(:src='ruta + form.imagen.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Licencia del Chofer
                            v-card(v-if="form.licen.url",style="margin-right: 0px;margin-top: 10px;", :id="form.licen.url")
                              v-card(:id="form.licen.url +3", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(form.licen.status) }")
                                v-card(v-if="form.licen.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.licen.status}}
                                v-card(v-if="form.licen.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.licen.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(form.licen, 1, "licen")') Modificar
                              v-btn(:id="form.licen.url+1", @click="aceptardocument(form.licen, 1, 'licen')",color='green', v-bind:class="{ ocultar: ocultar2(form.licen.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="form.licen.url+2", @click="rechazardocument(form.licen, 1, 'licen')",color='error', v-bind:class="{ ocultar: ocultar2(form.licen.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + form.licen.url" target="_blank")
                                img(:src='ruta + form.licen.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Identificación del Chofer
                            v-card(v-if="form.iden.url", style="margin-right: 0px;margin-top: 10px;" , :id="form.iden.url")
                              v-card(:id="form.iden.url + 3", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(form.iden.status) }")
                                v-card(v-if="form.iden.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.iden.status}}
                                v-card(v-if="form.iden.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.iden.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(form.iden, 1, "iden")') Modificar
                              v-btn(:id="form.iden.url+'1'", @click="aceptardocument(form.iden, 1, 'iden')",color='green', v-bind:class="{ ocultar: ocultar2(form.iden.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="form.iden.url+'2'", @click="rechazardocument(form.iden, 1, 'iden')",color='error', v-bind:class="{ ocultar: ocultar2(form.iden.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + form.iden.url" target="_blank")
                                img(:src='ruta + form.iden.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Matricula
                            v-card(v-if="form.matricula.url", style="margin-right: 0px;margin-top: 10px;" , :id="form.matricula.url")
                              v-card(:id="form.matricula.url + 3", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(form.matricula.status) }")
                                v-card(v-if="form.matricula.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.matricula.status}}
                                v-card(v-if="form.matricula.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.matricula.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(form.matricula, 1, "matricula")') Modificar
                              v-btn(:id="form.matricula.url+'1'", @click="aceptardocument(form.matricula, 1, 'matricula')",color='green', v-bind:class="{ ocultar: ocultar2(form.matricula.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="form.matricula.url+'2'", @click="rechazardocument(form.matricula, 1, 'matricula')",color='error', v-bind:class="{ ocultar: ocultar2(form.matricula.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + form.matricula.url" target="_blank")
                                img(:src='ruta + form.matricula.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Seguro
                            v-card(v-if="form.seguro.url", style="margin-right: 0px;margin-top: 10px;" , :id="form.seguro.url")
                              v-card(:id="form.seguro.url + 3", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(form.seguro.status) }")
                                v-card(v-if="form.seguro.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.seguro.status}}
                                v-card(v-if="form.seguro.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{form.seguro.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(form.seguro, 1, "seguro")') Modificar
                              v-btn(:id="form.seguro.url+'1'", @click="aceptardocument(form.seguro, 1, 'seguro')",color='green', v-bind:class="{ ocultar: ocultar2(form.seguro.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="form.seguro.url+'2'", @click="rechazardocument(form.seguro, 1, 'seguro')",color='error', v-bind:class="{ ocultar: ocultar2(form.seguro.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + form.seguro.url" target="_blank")
                                img(:src='ruta + form.seguro.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Fotos del Vehiculo
                            v-card(v-for='(item, i) in fotos', :id="item.url", style="margin-right: 0px;margin-top: 10px;")
                              v-card(:id="item.url + (i+2)", style="width:100%; height: 100%;position:absolute;background:#fff0f0c4;", v-bind:class="{ ocultar: ocultar(item.status) }")
                                v-card(v-if="item.status === 'Aceptado'", style="background:green;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{item.status}}
                                v-card(v-if="item.status === 'Rechazado'", style="background:#e84646;border-radius:10px;")
                                  v-card-title.justify-center
                                    span.white--text {{item.status}}
                                v-layout(align-center='', justify-center='', row='' fill-height='')
                                  v-btn(style="background:grey;border-radius:10px;", @click='modidocument(item, i, "vehiculo")') Modificar
                              v-btn(:id="item.url + i" @click="aceptardocument(item, i, 'vehiculo')",color='green', v-bind:class="{ ocultar: ocultar2(item.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 430px;')
                                v-icon(color='white' style='margin-top: 0px;') done
                              v-btn(:id="item.url + (i+1)" @click="rechazardocument(item, i, 'vehiculo')",color='error', v-bind:class="{ ocultar: ocultar2(item.status) }", style='border-radius:0px;background: #cc0707;padding:0px;position:absolute;margin-top:0px;min-width: 25px;margin-left: 457px;height: 20px;') X
                              a(:href="ruta + item.url" target="_blank")
                                img(:src='ruta + item.url', width='100%', height='100%')

                            //- v-card(style="margin-right: 0px;margin-top: 10px;")
                            //-   v-card-title.justify-center
                            //-     span Fotos del Vehiculo
                            //- v-card(v-for='item in fotos', :id="item.url", style="margin-right: 0px;margin-top: 10px;")
                            //-   img(:src='ruta + item.url', width='100%', height='100%')

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                              v-card-title.justify-center
                                span Respuesta

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="Asunto"
                                v-model="form2.titulo"
                                outline
                                required
                                prepend-inner-icon="subject"
                                label="Asunto:"
                                style="height: 56px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-textarea(id="mensaje"
                                outline
                                required
                                v-model="form2.cuerpo"
                                prepend-inner-icon="message"
                                label="Mensaje:"
                                style="height: 133px;")

                            v-card(style="margin-right: 0px;margin-top: 10px;")
                                v-text-field(id="unidad"
                                outline
                                required
                                v-model="form.unidad"
                                prepend-inner-icon="local_taxi"
                                label="Unidad:"
                                style="height: 56px;")

                            div(style="display: flex;justify-content: center;")
                                v-btn(v-if="form.estatus !== 'Rechazado'",style="background:blue;border-radius:10px;", @click="save(stat, 'aprobar')") Aprobar
                                v-btn(v-if="form.estatus !== 'Rechazado'",style="background:#e84646;border-radius:10px;", @click="save(stat2, 'rechazar')") Rechazar
                                v-btn(style="background:grey;border-radius:10px;", @click.native='close') Salir
    v-layout(align-start='', justify-start='', row='', fill-height='')
      v-flex(xs12 style='margin-top: 20px;')
        v-text-field(v-model='search', append-icon='search', label='Buscar' style='width:50%;')
        v-card(color='', style="border-radius: 0px 0px 20px 20px;background-color: #e84646;")
            v-card-title(style="padding: 7px;").justify-center
                span.white--text Lista de Choferes
        v-data-table.elevation-1(:headers='headers', :items="chofer", :search='search', style="margin-top: 5px;")
          template(slot='items', slot-scope='props')
            td(v-if='props.item.identificacion') {{ props.item.identificacion }}
            td(v-else) N/A
            td(v-if='props.item.telefono') {{ props.item.telefono }}
            td(v-if='!props.item.telefono') {{ " " }}
            td {{ props.item.nombre }}
            td {{ props.item.apellido }}
            td {{ props.item.email }}
            td {{ props.item.estatus }}
            td.justify-start.layout.px-0
                    v-btn(v-if='perm').mx-0(icon, @click='editItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') visibility
                    v-btn(v-if='perm').mx-0(icon, @click='carros(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') directions_car
                    v-btn(v-if='perm').mx-0(icon, @click='editItem2(props.item)', style='margin-top: -9px;')
                        v-icon(color='teal') edit
                    v-btn(v-if='elm').mx-0(icon, @click='deleteItem(props.item)', style='margin-top: -9px;')
                        v-icon(color='red') delete
</template>

<script>
import Api from "@/services/methods";
import { server, port } from "@/services/environment";
import EXIF from "exif-js";
export default {
  name: "mAdmChoferes",
  data: () => ({
    rules: {
      required: value => !!value || "Required.",
      string: value => {
        const pattern = /^[a-zA-Z]+$/;
        return pattern.test(value) || "dato invalido.";
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "";
      }
    },
    show1: false,
    dialogcarro: false,
    vehiculo: [],
    options: [],
    loading: false,
    optveh: ["Taxi", "Moto"],
    search: "",
    loading2: false,
    pass: false,
    ruta: server + ":" + port,
    perm: "",
    cre: "",
    elm: "",
    stat: "No Disponible",
    stat2: "Rechazado",
    doc: [],
    lic: [],
    ide: [],
    fotos: {},
    form2: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    },
    form3: {
      nombre: "",
      apellido: "",
      identificacion: "",
      direccion: [],
      descripcion: "",
      documents: [],
      telefono: "",
      password: "",
      email: "",
      unidad: "",
      imagen: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      identific: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      matricula: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      licencia: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      seguro: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      }
    },
    form: {
      nombre: "",
      apellido: "",
      identificacion: "",
      direccion: [],
      descripcion: "",
      documents: [],
      licen: [],
      unidad: "",
      iden: [],
      imagen: [],
      matricula: [],
      seguro: [],
      telefono: "",
      password: "",
      email: "",
      estatus: ""
    },
    dialog: false,
    dialog2: false,
    img_per: "",
    img_ide: "",
    img_mat: "",
    img_veh: "",
    img_lic: "",
    img_seg: "",
    formveh2: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    formveh: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    Defaultformveh: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    Defaultformveh2: {
      modelo: "",
      placa: "",
      color: "",
      extras: [],
      tipo: "",
      images: []
    },
    editedIndex: -1,
    editedIndex2: -1,
    chofer: [],
    headers: [
      { text: "Identificación", value: "identificacion" },
      { text: "Teléfono", value: "telefono" },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Correo", value: "email" },
      { text: "Estatus", value: "estatus" },
      { text: "Acción" }
    ],
    defaultForm: {
      nombre: "",
      apellido: "",
      documents: [],
      licen: [],
      unidad: "",
      iden: [],
      matricula: [],
      seguro: [],
      imagen: [],
      identificacion: "",
      direccion: [],
      password: "",
      descripcion: "",
      telefono: "",
      email: "",
      estatus: ""
    },
    files: [],
    veh_data: false,
    defaultForm3: {
      nombre: "",
      apellido: "",
      identificacion: "",
      direccion: [],
      password: "",
      descripcion: "",
      telefono: "",
      email: "",
      unidad: "",
      imagen: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      identific: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      matricula: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      licencia: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      },
      seguro: {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      }
    },
    defaultForm2: {
      clientes: [],
      choferes: [],
      titulo: "",
      cuerpo: "",
      tokencli: [],
      tokench: []
    }
  }),
  created() {
    this.verificacion();
    this.initialize();
  },
  sockets: {
    act_chof(data) {
      Api.get("chofer/admin/adm").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Pendiente" ||
            res.data[i].estatus === "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
    },
    putt_chof(data) {
      Api.get("chofer/admin/adm").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Pendiente" ||
            res.data[i].estatus === "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
    }
  },
  methods: {
    verificacion() {
      for (let i = 0; i < this.$store.state.usuario.permisos.length; i++) {
        if (this.$store.state.usuario.permisos[i].ruta === "Adm. de Choferes") {
          for (
            let j = 0;
            j < this.$store.state.usuario.permisos[i].accion.length;
            j++
          ) {
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Modificar"
            ) {
              this.perm = "yes";
            }
            if (this.$store.state.usuario.permisos[i].accion[j] === "Crear") {
              this.cre = "yes";
            }
            if (
              this.$store.state.usuario.permisos[i].accion[j] === "Eliminar"
            ) {
              this.elm = "yes";
            }
          }
        }
      }
    },
    pickFile_Per() {
      this.$refs.image_per.click();
    },
    onFilePicked_Per(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form3.imagen.imageName = "perfil";
        // if (this.form3.imagen.imageName.lastIndexOf(".") <= 0) {
        //   return;
        // }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.form3.imagen.imageUrl = fr.result;
          this.form3.imagen.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.form3.imagen.imageName = "";
        this.form3.imagen.imageFile = "";
        this.form3.imagen.imageUrl = "";
      }
    },
    pickFile_Iden() {
      this.$refs.image.click();
    },
    onFilePicked_Iden(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form3.identific.imageName = "iden";
        // if (this.form3.identific.imageName.lastIndexOf(".") <= 0) {
        //   return;
        // }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.form3.identific.imageUrl = fr.result;
          this.form3.identific.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.form3.identific.imageName = "";
        this.form3.identific.imageFile = "";
        this.form3.identific.imageUrl = "";
      }
    },
    pickFile_Mat() {
      this.$refs.image_mat.click();
    },
    onFilePicked_Mat(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form3.matricula.imageName = "matricula";
        // if (this.form3.matricula.imageName.lastIndexOf(".") <= 0) {
        //   return;
        // }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.form3.matricula.imageUrl = fr.result;
          this.form3.matricula.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.form3.matricula.imageName = "";
        this.form3.matricula.imageFile = "";
        this.form3.matricula.imageUrl = "";
      }
    },
    pickFile_Lic() {
      this.$refs.image_lic.click();
    },
    onFilePicked_Lic(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form3.licencia.imageName = "licen";
        // if (this.form3.licencia.imageName.lastIndexOf(".") <= 0) {
        //   return;
        // }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.form3.licencia.imageUrl = fr.result;
          this.form3.licencia.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.form3.licencia.imageName = "";
        this.form3.licencia.imageFile = "";
        this.form3.licencia.imageUrl = "";
      }
    },
    indice(indice, name) {
      this.formveh2.images.splice(indice, 1);
      for (let i = 0; i < this.files.length; i++) {
        if (name === this.files[i].name) {
          this.files.splice(i, 1);
        }
      }
    },
    pickFile_Veh() {
      this.$refs.image_veh.click();
    },
    onFilePicked_Veh(e) {
      this.files = [];
      this.formveh2.images = [];
      Array.prototype.push.apply(this.files, e.target.files);
      const files = e.target.files;
      if (files !== undefined) {
        for (let i = 0; i < files.length; i++) {
          const fr = new FileReader();
          fr.readAsDataURL(files[i]);
          fr.addEventListener("load", () => {
            this.formveh2.images.push({
              imageName: this.files[i].name,
              imageUrl: fr.result
            });
          });
        }
      } else {
        this.formveh2.images[0].imageName = "";
        this.formveh2.images[0].imageFile = "";
        this.formveh2.images[0].imageUrl = "";
      }
    },
    pickFile_Seg() {
      this.$refs.image_seg.click();
    },
    onFilePicked_Seg(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form3.seguro.imageName = "seguro";
        // if (this.form3.seguro.imageName.lastIndexOf(".") <= 0) {
        //   return;
        // }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.form3.seguro.imageUrl = fr.result;
          this.form3.seguro.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.form3.seguro.imageName = "";
        this.form3.seguro.imageFile = "";
        this.form3.seguro.imageUrl = "";
      }
    },
    initialize() {
      this.veh_data = false;
      this.files = [];
      this.img_per = "";
      this.img_mat = "";
      this.img_ide = "";
      this.img_lic = "";
      this.img_seg = "";
      this.form3.imagen.imageName = "";
      this.form3.imagen.imageFile = "";
      this.form3.imagen.imageUrl = "";
      this.form3.identific.imageName = "";
      this.form3.identific.imageFile = "";
      this.form3.identific.imageUrl = "";
      this.form3.matricula.imageName = "";
      this.form3.matricula.imageFile = "";
      this.form3.matricula.imageUrl = "";
      this.form3.licencia.imageName = "";
      this.form3.licencia.imageFile = "";
      this.form3.licencia.imageUrl = "";
      this.form3.seguro.imageName = "";
      this.form3.seguro.imageFile = "";
      this.form3.seguro.imageUrl = "";
      this.form.documents = [];
      this.form.licen = [];
      this.form.iden = [];
      this.pass = false;
      this.editedIndex = -1;
      this.editedIndex2 = -1;
      this.chofer = [];
      Api.get("extra").then(res => {
        this.options = [];
        for (let i = 0; i < res.data.length; i++) {
          this.options.push(res.data[i].nombre);
        }
      });
      Api.get("chofer/admin/adm").then(res => {
        this.chofer = [];
        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].estatus === "Pendiente" ||
            res.data[i].estatus === "Rechazado"
          ) {
            this.chofer.push(res.data[i]);
          }
        }
      });
    },
    ocultar(item) {
      if (item === "Pendiente") {
        return true;
      } else {
        return false;
      }
    },
    ocultar2(item) {
      if (item === "Pendiente") {
        return false;
      } else {
        return true;
      }
    },
    modidocument(item, i, t) {
      document.getElementById(item.url + i).hidden = false;
      document.getElementById(item.url + (i + 1)).hidden = false;
      document.getElementById(item.url + i).hidden = false;
      document.getElementById(item.url + (i + 1)).hidden = false;
      document.getElementById(item.url + (i + 2)).hidden = true;
      if (t === "matricula") {
        this.form.matricula.status = "Pendiente";
      }
      if (t === "imagen") {
        this.form.imagen.status = "Pendiente";
      }
      if (t === "seguro") {
        this.form.seguro.status = "Pendiente";
      }
      if (t === "vehiculo") {
        this.fotos[i].status = "Pendiente";
      }
      if (t === "licen") {
        this.form.licen.status = "Pendiente";
      }
      if (t === "iden") {
        this.form.iden.status = "Pendiente";
      }
    },
    aceptardocument(item, i, t) {
      document.getElementById(item.url + i).hidden = true;
      document.getElementById(item.url + (i + 1)).hidden = true;
      document.getElementById(item.url + i).hidden = true;
      document.getElementById(item.url + (i + 1)).hidden = true;
      document.getElementById(item.url + (i + 2)).hidden = false;
      if (t === "matricula") {
        this.form.matricula.status = "Aceptado";
      }
      if (t === "imagen") {
        this.form.imagen.status = "Aceptado";
      }
      if (t === "vehiculo") {
        this.fotos[i].status = "Aceptado";
      }
      if (t === "seguro") {
        this.form.seguro.status = "Aceptado";
      }
      if (t === "licen") {
        this.form.licen.status = "Aceptado";
      }
      if (t === "iden") {
        this.form.iden.status = "Aceptado";
      }
    },
    rechazardocument(item, i, t) {
      document.getElementById(item.url + i).hidden = true;
      document.getElementById(item.url + (i + 1)).hidden = true;
      document.getElementById(item.url + i).hidden = true;
      document.getElementById(item.url + (i + 1)).hidden = true;
      document.getElementById(item.url + (i + 2)).hidden = false;
      if (t === "matricula") {
        this.form.matricula.status = "Rechazado";
      }
      if (t === "imagen") {
        this.form.imagen.status = "Rechazado";
      }
      if (t === "seguro") {
        this.form.seguro.status = "Rechazado";
      }
      if (t === "vehiculo") {
        this.fotos[i].status = "Rechazado";
      }
      if (t === "licen") {
        this.form.licen.status = "Rechazado";
      }
      if (t === "iden") {
        this.form.iden.status = "Rechazado";
      }
    },
    close() {
      this.veh_data = false;
      this.dialogcarro = false;
      this.files = [];
      this.img_per = "";
      this.img_mat = "";
      this.img_ide = "";
      this.img_lic = "";
      this.img_seg = "";
      this.form3.imagen.imageName = "";
      this.form3.imagen.imageFile = "";
      this.form3.imagen.imageUrl = "";
      this.form3.identific.imageName = "";
      this.form3.identific.imageFile = "";
      this.form3.identific.imageUrl = "";
      this.form3.matricula.imageName = "";
      this.form3.matricula.imageFile = "";
      this.form3.matricula.imageUrl = "";
      this.form3.licencia.imageName = "";
      this.form3.licencia.imageFile = "";
      this.form3.licencia.imageUrl = "";
      this.form3.seguro.imageName = "";
      this.form3.seguro.imageFile = "";
      this.form3.seguro.imageUrl = "";
      this.chofer = [];
      this.fotos = {};
      this.form = Object.assign({}, this.defaultForm);
      this.formveh = Object.assign({}, this.defaultFormVeh);
      this.form2 = Object.assign({}, this.defaultForm2);
      this.form3 = Object.assign({}, this.defaultForm3);
      this.dialog = false;
      this.dialog2 = false;
      this.initialize();
    },
    editItem(item) {
      this.editedIndex = this.chofer.indexOf(item);
      Object.keys(this.form).map(key => {
        if (item[key]) this.form[key] = item[key];
      });
      if (item.vehiculo) {
        this.formveh.modelo = item.vehiculo.modelo;
        this.formveh.placa = item.vehiculo.placa;
        this.formveh.tipo = item.vehiculo.tipo;
        this.formveh.color = item.vehiculo.color;
        this.formveh.extras = item.vehiculo.extras;
        this.formveh.images = item.vehiculo.images;
      }
      this.form._id = item._id;
      Api.get(`vehiculo/owner/${item._id}`)
        .then(res => {
          this.vehiculo = res.data;
          var fotos = res.data.images;
          this.fotos = fotos;
        })
        .catch(err => {
          console.log(err);
        });
      if (item.fcmtoken) {
        this.form2.tokench.push(item.fcmtoken);
      }
      this.form2.choferes.push(item._id);
      this.dialog = true;
      setTimeout(() => {
        let imgs = window.document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
          EXIF.getData(imgs[i], () => {
            switch (parseInt(EXIF.getTag(imgs[i], "Orientation"))) {
              case 2:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 3:
                imgs[i].style.transform = "rotate(180deg)";
                break;
              case 4:
                imgs[i].style.transform = "rotate(180deg) scaleX(-1)";
                break;
              case 5:
                imgs[i].style.transform = "rotate(270deg) scaleX(-1)";
                break;
              case 6:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 7:
                imgs[i].style.transform = "rotate(90deg) scaleX(-1)";
                break;
              case 8:
                imgs[i].style.transform = "rotate(270deg) scale(0.57,1.78)";
                break;
            }
          });
        }
      }, 500);
    },
    editItem2(item) {
      this.editedIndex2 = this.chofer.indexOf(item);
      Object.keys(this.form3).map(key => {
        if (item[key]) this.form3[key] = item[key];
      });
      if (item.imagen && item.imagen.url) {
        this.img_per = item.imagen.url;
      }
      if (item.iden && item.iden.url) {
        this.img_ide = item.iden.url;
      }
      if (item.matricula && item.matricula.url) {
        this.img_mat = item.matricula.url;
      }
      if (item.licen && item.licen.url) {
        this.img_lic = item.licen.url;
      }
      if (item.seguro && item.seguro.url) {
        this.img_seg = item.seguro.url;
      }
      this.form3.imagen = {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
      this.form3.identific = {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
      this.form3.matricula = {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
      this.form3.licencia = {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
      this.form3.seguro = {
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
      this.form3._id = item._id;
      this.dialog2 = true;
      this.pass = true;
      setTimeout(() => {
        let imgs = window.document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
          EXIF.getData(imgs[i], () => {
            switch (parseInt(EXIF.getTag(imgs[i], "Orientation"))) {
              case 2:
                imgs[i].style.transform = "rotate(90deg) scale(0.50,1.75)";
                break;
              case 3:
                imgs[i].style.transform = "rotate(180deg)";
                break;
              case 4:
                imgs[i].style.transform = "rotate(180deg) scaleX(-1)";
                break;
              case 5:
                imgs[i].style.transform = "rotate(270deg) scaleX(-1)";
                break;
              case 6:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 7:
                imgs[i].style.transform = "rotate(90deg) scaleX(-1)";
                break;
              case 8:
                imgs[i].style.transform = "rotate(270deg) scale(0.50,2.05)";
                break;
            }
          });
        }
      }, 500);
    },
    carros(item) {
      this.formveh2.owner = item._id;
      if (item.vehiculo) {
        this.formveh2._id = item.vehiculo._id;
        this.veh_data = true;
        this.img_veh = item.vehiculo.images;
        Object.keys(this.formveh2).map(key => {
          if (item.vehiculo[key]) this.formveh2[key] = item.vehiculo[key];
        });
        this.formveh2.images = [];
        if (item.vehiculo.images) {
          for (let i = 0; i < item.vehiculo.images.length; i++) {
            this.formveh2.images.push({
              imageName: item.vehiculo.images[i].url,
              imageUrl: this.ruta + item.vehiculo.images[i].url
            });
          }
        }
      }
      this.dialogcarro = true;
      setTimeout(() => {
        let imgs = window.document.getElementsByTagName("img");
        for (let i = 0; i < imgs.length; i++) {
          EXIF.getData(imgs[i], () => {
            switch (parseInt(EXIF.getTag(imgs[i], "Orientation"))) {
              case 2:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 3:
                imgs[i].style.transform = "rotate(180deg)";
                break;
              case 4:
                imgs[i].style.transform = "rotate(180deg) scaleX(-1)";
                break;
              case 5:
                imgs[i].style.transform = "rotate(270deg) scaleX(-1)";
                break;
              case 6:
                imgs[i].style.transform = "rotate(90deg) scale(0.57,1.78)";
                break;
              case 7:
                imgs[i].style.transform = "rotate(90deg) scaleX(-1)";
                break;
              case 8:
                imgs[i].style.transform = "rotate(270deg) scale(0.57,1.78)";
                break;
            }
          });
        }
      }, 500);
    },
    deleteItem(item) {
      this.$swal
        .fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta operación!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar!"
        })
        .then(result => {
          if (result.value) {
            Api.delete("chofer/admin/adm/" + item._id)
              .then(res => {
                this.$swal.fire(
                  "Felicidades.!",
                  "Eliminación realizada exitosamente.",
                  "success"
                );
                this.close();
              })
              .catch(err => {
                console.error(err);
              });
          }
        });
    },
    guardarvehiculo() {
      if (
        this.formveh2.modelo &&
        this.formveh2.placa &&
        this.formveh2.color &&
        this.formveh2.tipo
      ) {
        if (this.files.length === 0) {
          let q = [];
          for (let i = 0; i < this.formveh2.images.length; i++) {
            for (let j = 0; j < this.img_veh.length; j++) {
              if (this.formveh2.images[i].imageName === this.img_veh[j].url) {
                q.push(this.formveh2.images[i].imageName);
              }
            }
          }
          this.formveh2.images = q;
        }
        const data = new FormData();
        Object.keys(this.formveh2).map(key => {
          if (Array.isArray(this.formveh2[key])) {
            this.formveh2[key].forEach(val => {
              if (typeof val === "object" && val !== null) {
                return data.append(`${key}[]`, JSON.stringify(val));
              }
              return data.append(`${key}[]`, val);
            });
          } else if (
            typeof this.formveh2[key] === "object" &&
            this.formveh2[key] !== null
          ) {
            return data.append(key, JSON.stringify(this.formveh2[key]));
          } else {
            return data.append(key, this.formveh2[key]);
          }
        });
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i];
          data.append("images", file);
        }
        if (this.veh_data === true) {
          this.loading = true;
          Api.put("vehiculo/admin", data)
            .then(res => {
              this.loading = false;
              // this.formveh2 = Object.assign({}, this.defaultFormVeh2);
              this.dialogcarro = false;
              this.$swal.fire(
                "Felicidades.!",
                "Modificación realizada exitosamente.",
                "success"
              );
              this.initialize();
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
              this.$swal.fire(
                "Oops...",
                "Error encontrado, verifique los datos o llame al administrador.",
                "error"
              );
            });
        } else {
          this.loading = true;
          Api.post("vehiculo/admin", data)
            .then(res => {
              this.loading = false;
              // this.formveh2 = Object.assign({}, this.defaultFormVeh2);
              this.dialogcarro = false;
              this.$swal.fire(
                "Felicidades.!",
                "Registro realizado exitosamente.",
                "success"
              );
              this.initialize();
            })
            .catch(err => {
              this.loading = false;
              console.log(err);
              this.$swal.fire(
                "Oops...",
                "Error encontrado, verifique los datos o llame al administrador.",
                "error"
              );
            });
        }
      } else {
        this.$swal.fire(
          "Oops...",
          "Error encontrado, debe ingresar todos los campos correspondientes.",
          "error"
        );
      }
    },
    guardar() {
      if (
        this.form3.password &&
        this.form3.telefono &&
        this.form3.nombre &&
        this.form3.apellido &&
        this.form3.identificacion &&
        this.form3.unidad
      ) {
        this.loading = true;
        const data = new FormData();
        Object.keys(this.form3).map(key => {
          if (Array.isArray(this.form3[key])) {
            this.form3[key].forEach(val => {
              if (typeof val === "object" && val !== null) {
                return data.append(`${key}[]`, JSON.stringify(val));
              }
              return data.append(`${key}[]`, val);
            });
          } else if (
            typeof this.form3[key] === "object" &&
            this.form3[key] !== null
          ) {
            return data.append(key, JSON.stringify(this.form3[key]));
          } else {
            return data.append(key, this.form3[key]);
          }
        });
        if (this.form3.imagen.imageFile)
          data.append("perfil", this.form3.imagen.imageFile);
        if (this.form3.identific.imageFile)
          data.append("iden", this.form3.identific.imageFile);
        if (this.form3.matricula.imageFile)
          data.append("matricula", this.form3.matricula.imageFile);
        if (this.form3.licencia.imageFile)
          data.append("licen", this.form3.licencia.imageFile);
        if (this.form3.seguro.imageFile)
          data.append("seguro", this.form3.seguro.imageFile);
        if (this.editedIndex2 > -1) {
          Api.put("chofer/admin/documents", data)
            .then(res => {
              this.form3 = Object.assign({}, this.defaultForm3);
              this.dialog2 = false;
              this.$swal.fire(
                "Felicidades.!",
                "Modificación realizado exitosamente.",
                "success"
              );
              this.loading = false;
              this.initialize();
            })
            .catch(err => {
              this.form3 = Object.assign({}, this.defaultForm3);
              this.loading = false;
              this.$swal.fire(
                "Oops...",
                "Error encontrado, verifique los datos o llame al administrador.",
                "error"
              );
            });
        } else {
          Api.post("chofer/admin", data)
            .then(res => {
              if (!res.data.message) {
                this.form3 = Object.assign({}, this.defaultForm3);
                this.dialog2 = false;
                this.loading = false;
                this.$swal.fire(
                  "Felicidades.!",
                  "Registro realizado exitosamente.",
                  "success"
                );
                this.initialize();
              } else {
                this.$swal.fire(
                  "Oops...",
                  "Error encontrado, el número de teléfono ya se encuentra registrado.",
                  "error"
                );
              }
            })
            .catch(err => {
              this.loading = false;
              this.form3 = Object.assign({}, this.defaultForm3);
              this.$swal.fire(
                "Oops...",
                "Error encontrado, verifique los datos o llame al administrador.",
                "error"
              );
            });
        }
      } else {
        this.loading = false;
        this.$swal.fire(
          "Oops...",
          "Error encontrado, para realizar el registro no debe dejar campos vacios.",
          "error"
        );
      }
    },
    save(stat, info) {
      if (this.editedIndex > -1) {
        if (this.form2.titulo && this.form2.cuerpo) {
          if (info === "aprobar") {
            let cont = 0;
            for (let i = 0; i < this.fotos.length; i++) {
              if (this.fotos[i].status && this.fotos[i].status === "Aceptado") {
                cont = cont + 1;
              }
            }
            if (
              this.form.imagen &&
              this.form.imagen.status &&
              this.form.imagen.status === "Aceptado" &&
              this.form.matricula &&
              this.form.matricula.status &&
              this.form.matricula.status === "Aceptado" &&
              this.form.seguro &&
              this.form.seguro.status &&
              this.form.seguro.status === "Aceptado" &&
              this.form.licen &&
              this.form.licen.status &&
              this.form.licen.status === "Aceptado" &&
              this.form.iden &&
              this.form.iden.status &&
              this.form.iden.status === "Aceptado" &&
              this.fotos &&
              cont > 0 &&
              cont === this.fotos.length
            ) {
              this.form.estatus = stat;
              this.vehiculo.images = this.fotos;
              let form2 = {
                chofer: this.form,
                vehiculo: this.vehiculo,
                razon: this.form2.cuerpo,
                unidad: this.form.unidad
              };
              Api.put("chofer/admin/adm/status", form2)
                .then(res => {
                  Api.post("notificaciones", this.form2)
                    .then(res => {
                      this.form2 = Object.assign({}, this.defaultForm2);
                      this.$swal.fire(
                        "Felicidades.!",
                        "Notificación enviada exitosamente.",
                        "success"
                      );
                    })
                    .catch(err => {
                      console.log(err);
                      this.form2 = Object.assign({}, this.defaultForm2);
                      this.$swal.fire(
                        "Oops...",
                        "Error encontrado, verifique los datos o llame al administrador.",
                        "error"
                      );
                    });
                  this.form = Object.assign({}, this.defaultForm);
                  this.dialog = false;
                  this.close();
                })
                .catch(err => {
                  this.$swal.fire(
                    "Oops...",
                    "Error encontrado, verifique los datos o llame al administrador.",
                    "error"
                  );
                });
            } else {
              this.$swal.fire(
                "Oops...",
                "Error encontrado, no se puede aceptar el chofer sin tener los documentos aprobados.",
                "error"
              );
            }
          } else {
            if (info === "rechazar") {
              // let cont = 0;
              // for (let i = 0; i < this.fotos.length; i++) {
              //   if (
              //     this.fotos[i].status &&
              //     this.fotos[i].status !== "Pendiente"
              //   ) {
              //     cont = cont + 1;
              //   }
              // }
              // if (
              //   this.form.imagen &&
              //   this.form.imagen.status &&
              //   this.form.imagen.status !== "Pendiente" &&
              //   this.form.matricula &&
              //   this.form.matricula.status &&
              //   this.form.matricula.status !== "Pendiente" &&
              //   this.form.seguro &&
              //   this.form.seguro.status &&
              //   this.form.seguro.status !== "Pendiente" &&
              //   this.form.licen &&
              //   this.form.licen.status &&
              //   this.form.licen.status !== "Pendiente" &&
              //   this.form.iden &&
              //   this.form.iden.status &&
              //   this.form.iden.status !== "Pendiente" &&
              //   this.fotos &&
              //   cont === this.fotos.length
              // ) {
              let cont2 = 0;
              for (let i = 0; i < this.fotos.length; i++) {
                if (
                  this.fotos[i].status &&
                  this.fotos[i].status === "Rechazado"
                ) {
                  cont2 = cont2 + 1;
                }
              }
              if (
                (this.form.imagen &&
                  this.form.imagen.status &&
                  this.form.imagen.status === "Rechazado") ||
                (this.form.matricula &&
                  this.form.matricula.status &&
                  this.form.matricula.status === "Rechazado") ||
                (this.form.seguro &&
                  this.form.seguro.status &&
                  this.form.seguro.status === "Rechazado") ||
                (this.form.licen &&
                  this.form.licen.status &&
                  this.form.licen.status === "Rechazado") ||
                (this.form.iden &&
                  this.form.iden.status &&
                  this.form.iden.status === "Rechazado") ||
                (this.fotos && cont2 > 0)
              ) {
                this.form.estatus = stat;
                this.vehiculo.images = this.fotos;
                let form2 = {
                  chofer: this.form,
                  vehiculo: this.vehiculo,
                  razon: this.form2.cuerpo,
                  unidad: this.form.unidad
                };
                Api.put("chofer/admin/adm/status", form2)
                  .then(res => {
                    Api.post("notificaciones", this.form2)
                      .then(res => {
                        this.form2 = Object.assign({}, this.defaultForm2);
                        this.$swal.fire(
                          "Felicidades.!",
                          "Notificación enviada exitosamente.",
                          "success"
                        );
                      })
                      .catch(err => {
                        console.log(err);
                        this.form2 = Object.assign({}, this.defaultForm2);
                        this.$swal.fire(
                          "Oops...",
                          "Error encontrado, verifique los datos o llame al administrador.",
                          "error"
                        );
                      });
                    this.form = Object.assign({}, this.defaultForm);
                    this.dialog = false;
                    this.close();
                  })
                  .catch(err => {
                    this.$swal.fire(
                      "Oops...",
                      "Error encontrado, verifique los datos o llame al administrador.",
                      "error"
                    );
                  });
              } else {
                this.$swal.fire(
                  "Oops...",
                  "Error encontrado, no se puede rechazar el chofer sin tener algun documento rechazado.",
                  "error"
                );
              }
            }
          }
        } else {
          this.$swal.fire(
            "Oops...",
            "Error encontrado, verifique si la notificación tiene un asunto y un mensaje.",
            "error"
          );
        }
      }
    }
  }
};
</script>
<style>
.ocultar {
  display: none;
}
</style>
