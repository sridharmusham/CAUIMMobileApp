import React, { Component } from 'react';
import Environment from '../../Environment'

export default class Proxy {
    get = (uri) => {

        var auth = Environment.AUTH;
        return fetch(uri, {
            method: "GET",
            headers: {
                'Authorization': auth,
                'Accept': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            if (response.status == 200) {
                response = response.json();
                return response;
            }
            else if(response.status == 401){
                throw new Error('Login failed');
            }
            else throw response;
        });

    }
}