/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CDataTable,
  CButtonGroup,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import Modal from 'src/components/Modal'

import useApi from '../services/api'

export default () => {
  const api = useApi()

  const [loading, setLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalId, setModalId] = useState('')
  const [modalUnitList, setModalUnitList] = useState([])
  const [modalAreaList, setModalAreaList] = useState([])
  const [modalUnitId, setModalUnitId] = useState(0)
  const [modalAreaId, setModalAreaId] = useState(0)
  const [modalDateField, setModalDateField] = useState()

  const fields = [
    { label: 'Unidade', key: 'name_unit', sorter: false },
    { label: 'Área', key: 'name_area', sorter: false },
    { label: 'Data da Reserva', key: 'reservation_date' },
    { label: 'Ações', key: 'actions', _style: { width: '1px' }, sorter: false, filter: false }
  ]

  useEffect(() => {
    getList()
    getUnitList()
    getAreaList()
  }, [])

  const getUnitList = async () => {
    const result = await api.getUnits()

    if (result.error === '') {
      setModalUnitList(result.list)
    }
  }

  const getAreaList = async () => {
    const result = await api.getAreas()

    if (result.error === '') {
      setModalAreaList(result.list)
    }
  }

  const getList = async () => {
    setLoading(true)
    const result = await api.getReservations()
    setLoading(false)
    if (result.error === '') {
      setList(result.list)
    } else {
      alert(result.error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEditButton = (id) => {
    let index = list.findIndex(v => v.id === id)

    setModalId(list[index]['id'])
    setModalUnitId(list[index]['id_unit'])
    setModalAreaId(list[index]['id_area'])
    setModalDateField(list[index]['reservation_date'])
    setShowModal(true)
  }

  const handleModalSave = async () => {
    if (modalUnitId && modalAreaId && modalDateField) {
      setModalLoading(true)

      let result
      let data = {
        id_unit: modalUnitId,
        id_area: modalAreaId,
        reservation_date: modalDateField
      }

      if (modalId === '') {
        result = await api.addReservation(data)
      } else {
        result = await api.updateReservation(modalId, data)
      }
      setModalLoading(false)

      if (result.error === '') {
        setShowModal(false)
        getList()
      }
    } else {
      alert('Whoops: Todos os campos são obrigátorio!')
    }
  }

  const handleRemoveButton = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      const result = await api.removeReservation(id)

      if (result.error === '') {
        getList()
      } else {
        alert(result.error)
      }
    }
  }

  const handleNewButton = () => {
    setModalId('')
    setModalUnitId(modalUnitList[0]['id'])
    setModalAreaId(modalAreaList[0]['id'])
    setModalDateField('')
    setShowModal(true)
  }

  return (
    <>
      <CRow>
        <CCol>
          <h2>Reservas</h2>

          <CCard>
            <CCardHeader>
              <CButton
                color="primary"
                disabled={modalUnitList.length === 0 || modalAreaList.length === 0}
                onClick={handleNewButton}
              >
                <CIcon name="cil-check" /> Nova Reserva
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={list}
                fields={fields}
                loading={loading}
                noItemsViewSlot=" "
                columnFilter
                sorter
                hover
                striped
                bordered
                pagination
                itemsPerPage={10}
                scopedSlots={{
                  'reservation_date': (item) => (
                    <td>
                      {item.reservation_date_formatted}
                    </td>
                  ),
                  'actions': (item) => (
                    <td>
                      <CButtonGroup>
                        <CButton
                          color="info"
                          disabled={modalUnitList.length === 0 || modalAreaList.length === 0}
                          onClick={() => handleEditButton(item.id)}
                        >
                          Editar
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleRemoveButton(item.id)}
                        >
                          Excluir
                        </CButton>
                      </CButtonGroup>
                    </td>
                  )
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleModalSave={handleModalSave}
        modalLoading={modalLoading}
        modalId={modalId}
      >
        <CFormGroup>
          <CLabel htmlFor="modal-unit">Unidade</CLabel>
          <CSelect
            id="modal-unit"
            custom
            value={modalUnitId}
            onChange={(e) => setModalUnitId(e.target.value)}
          >
            {modalUnitList.map((item, index) => (
              <option
                key={index}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </CSelect>
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="modal-area">Área</CLabel>
          <CSelect
            id="modal-area"
            custom
            value={modalAreaId}
            onChange={(e) => setModalAreaId(e.target.value)}
          >
            {modalAreaList.map((item, index) => (
              <option
                key={index}
                value={item.id}
              >
                {item.title}
              </option>
            ))}
          </CSelect>
        </CFormGroup>

        <CFormGroup>
          <CLabel htmlFor="modal-date">Data da Reserva</CLabel>
          <CInput
            type="text"
            id="modal-date"
            disabled={modalLoading}
            value={modalDateField}
            onChange={(e) => setModalDateField(e.target.value)}
          />
        </CFormGroup>

      </Modal>
    </>
  )
}
