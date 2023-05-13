<?php
    // Lee el contenido del archivo JSON
$json_data = file_get_contents('items.json');
// Convierte el contenido JSON en un objeto o array de PHP
$data = json_decode($json_data);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor de Monedas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <img src="img/icono.png" alt="" class="conversor-img">
    <h1>Conversor de Monedas</h1>
    <p>Escoje la moneda y la cantidad para realizar la conversion</p>
    <div class="container">
        <div class="contenedor-moneda">
            <div class="moneda">
                <select name="" id="moneda-uno">
                    <?php foreach($data as $monedas):?>
                        <option value="<?= $monedas->code  ?>"><?= $monedas->code  ?></option>
                    <?php endforeach;?>
                </select>
                <input type="number" id="cantidad-uno" placeholder="0" value="1" min="0">
            </div>
            <p id="paisMoneda1">USD es la moneda de Estado Unidos</p>
        </div>
        <div class="taza-de-cambio">
            <button class="btn" id="taza">Cambio</button>
        </div>
        <div  class="contenedor-moneda">
            <div class="moneda">
                <select name="" id="moneda-dos">
                    <?php foreach($data as $monedas):?>
                        <option value="<?= $monedas->code ?>"><?= $monedas->code  ?></option>
                    <?php endforeach;?>
                </select>
                <input type="number" id="cantidad-dos" placeholder="0" readonly>
            </div>
            <p id="paisMoneda2">USD es la moneda de Estado Unidos</p>
        </div>
        <div class="cambio" id="cambio">1 USD = 1 USD</div>
    </div>
    <script src="script.js"></script>
</body>
</html>