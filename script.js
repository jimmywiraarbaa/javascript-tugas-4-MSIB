class Pegawai {
    constructor(nama, jabatan, gaji, status) {
        this.nama = nama;
        this.jabatan = jabatan;
        this.gaji = gaji;
        this.status = status;
    }

    hitungTunjanganJabatan() {
        return this.gaji * 0.15;
    }

    hitungBPJS() {
        return this.gaji * 0.1;
    }

    hitungTunjanganKeluarga() {
        return this.status === 'menikah' ? this.gaji * 0.2 : 0;
    }

    hitungTotalGaji() {
        return this.gaji + this.hitungTunjanganJabatan() - this.hitungBPJS() + this.hitungTunjanganKeluarga();
    }
}

let dataPegawai = [];

function cetak() {
    const nama = document.getElementById('nama').value;
    const jabatan = document.getElementById('jabatan').value;
    const gaji = parseInt(document.getElementById('gaji').value);
    const status = document.getElementById('status').value;

    if (isNaN(gaji) || gaji <= 0) {
        alert('Masukkan gaji yang valid.');
        return;
    }

    const pegawai = new Pegawai(nama, jabatan, gaji, status);
    dataPegawai.push(pegawai);

    document.getElementById('form-pegawai').reset();

    const tabelPegawai = cetakDataPegawai(dataPegawai);
    document.getElementById('tabel-pegawai').innerHTML = '';
    document.getElementById('tabel-pegawai').appendChild(tabelPegawai);

    let pegawaiStr = '<div style="text-align: left;">Data Pegawai:<br><br>';
    for (let i = 0; i < dataPegawai.length; i++) {
        const pegawai = dataPegawai[i];
        pegawaiStr += `<b>Nama:</b> ${pegawai.nama}<br>`;
        pegawaiStr += `<b>Jabatan:</b> ${pegawai.jabatan}<br>`;
        pegawaiStr += `<b>Status:</b> ${pegawai.status}<br>`;
        pegawaiStr += `<b>Gaji Pokok:</b> ${pegawai.gaji}<br>`;
        pegawaiStr += `<b>Tunjangan Jabatan:</b> ${pegawai.hitungTunjanganJabatan()}<br>`;
        pegawaiStr += `<b>BPJS:</b> ${pegawai.hitungBPJS()}<br>`;
        pegawaiStr += `<b>Tunjangan Keluarga:</b> ${pegawai.hitungTunjanganKeluarga()}<br>`;
        pegawaiStr += `<b>Total Gaji:</b> ${pegawai.hitungTotalGaji()}<br><br>`;
    }
    pegawaiStr += '</div>';

    Swal.fire({
        icon: "success",
        title: 'Data Pegawai',
        html: pegawaiStr
    });
}

function cetakDataPegawai(data) {
    const table = document.createElement('table');
    table.setAttribute('border', '1');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Nama Pegawai', 'Jabatan', 'Status', 'Gaji Pokok', 'Tunjangan Jabatan', 'BPJS', 'Tunjangan Keluarga', 'Total Gaji'];

    for (let i = 0; i < headers.length; i++) {
        const header = document.createElement('th');
        header.textContent = headers[i];
        headerRow.appendChild(header);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let i = 0; i < data.length; i++) {
        const pegawai = data[i];
        const row = document.createElement('tr');
        const gajiPokok = pegawai.jabatan === 'Manager' ? 15000000 : (pegawai.jabatan === 'Asisten Manager' ? 10000000 : 5000000);
        const tunjanganJabatan = pegawai.hitungTunjanganJabatan();
        const bpjs = pegawai.hitungBPJS();
        const tunjanganKeluarga = pegawai.hitungTunjanganKeluarga();
        const totalGaji = pegawai.hitungTotalGaji();

        const dataRow = [pegawai.nama, pegawai.jabatan, pegawai.status, gajiPokok, tunjanganJabatan, bpjs, tunjanganKeluarga, totalGaji];

        for (let j = 0; j < dataRow.length; j++) {
            const cell = document.createElement('td');
            cell.textContent = dataRow[j];
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    const tfoot = document.createElement('tfoot');
    const totalRow = document.createElement('tr');
    const totalCell = document.createElement('td');
    totalCell.colSpan = headers.length - 1;
    totalCell.textContent = 'Total Gaji:';
    const totalGajiCell = document.createElement('td');
    const totalGaji = data.reduce((total, pegawai) => total + pegawai.hitungTotalGaji(), 0);
    totalGajiCell.textContent = totalGaji;

    totalRow.appendChild(totalCell);
    totalRow.appendChild(totalGajiCell);
    tfoot.appendChild(totalRow);
    table.appendChild(tfoot);

    return table;
}
