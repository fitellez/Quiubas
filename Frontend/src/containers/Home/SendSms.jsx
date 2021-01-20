import React, { Component } from 'react';
import '../../assets/styles/Menu.scss';
import axios from 'axios';

export class SendSms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pais: '+52',
            numero: '',
            mensaje: '',
            allSms:[],
            loading: true
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
      try {
        axios({
            method: 'GET',
            url: `${process.env.api}/sms`,
        }).then((response) => {
            // console.log(response.data);
            this.setState({allSms: response.data})
        });
        
    } catch (error) {}
    }
    
    onSendSms(e) {
        e.preventDefault();
        const { pais, numero, mensaje } = this.state;
        const body = {
            numero: pais + numero,
            mensaje
        };
        try {
            axios({
                method: 'POST',
                url: `${process.env.api}/sms`,
                data: body
            }).then((response) => {
                alert('Mensaje Enviado');
            });
        } catch (error) {}
    }


    render() {
      const { allSms } = this.state;
        return (
            <>
                <div className='mx-4 mx-lg-5'>
                    <div className='row '>
                        <div className='col-12 col-md-6 offset-0 offset-md-3 Menu-BgColor mt-5'>
                            <h4 className="my-3">Enviar Mensaje</h4>
                            <form onSubmit={(e) => this.onSendSms(e)}>
                                <div className='form-row'>
                                    <div className='form-group col-md-3'>
                                        <label htmlFor='pais'>País</label>
                                        <select
                                            className='form-control'
                                            name='pais'
                                            id='pais'
                                            onChange={this.onChange.bind(this)}
                                        >
                                            <option value='+52'>Mexico</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-md-9'>
                                        <label htmlFor='numero'>Número</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            name='numero'
                                            id='numero'
                                            maxLength='10'
                                            placeholder='Número'
                                            onChange={this.onChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='mensaje'>Mensaje</label>
                                    <textarea
                                        class='form-control'
                                        id='mensaje'
                                        name='mensaje'
                                        rows='3'
                                        onChange={this.onChange.bind(this)}
                                    ></textarea>
                                </div>
                                <div className='row justify-content-end my-3'>
                                    <div className='col-6 text-right'>
                                        <button
                                            type='submit'
                                            className='btn btn-primary text-white font-weight-bold px-2 px-lg-5'
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='row mt-5'>
                        <div className='col-12 Menu-BgColor' >
                          <h4 className="my-3">Todos los mensajes enviados</h4>
                            <div className="table-responsive">
                                <table className='table table-striped table-hover'>
                                    <thead>
                                        <tr className='text-center'>
                                            <th>Compañia</th>
                                            <th>Número</th>
                                            <th>Mensaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {allSms.map((item, i) => {
                                      return (
                                        <tr key={i} className="text-center">
                                          <td>{item.network}</td>
                                          <td>{item.number}</td>
                                          <td>{item.message}</td>
                                        </tr>
                                      );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SendSms;
