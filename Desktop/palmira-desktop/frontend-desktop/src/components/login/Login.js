import React, { useState } from "react";
import "./login.css";
import axios from "axios";

import Swal from "sweetalert2";

import loginImg from "./loginImg.png";

export const Login = ({ setUid, setUser }) => {
  const [loginValues, setLoginValues] = useState({
    lemail: "",
    lpassword: "",
  });

  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [startLogging, setStartLogging] = useState(false);

  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    console.log(loginValues);
    e.preventDefault();
    setIsLoginLoading(true);

    axios
      .post("https://hidden-journey-49991.herokuapp.com/api/auth/loginUser", {
        loginValues,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          setUser(res.data.user);
          setUid(res.data.user.uid);
        } else {
          Swal.fire("error", res.data.msg, "info");
          setIsLoginLoading(false);
        }
      });
  };

  return (
    <div className="login-screen">
      <div className="login">
        <img
          alt=""
          onClick={() => {
            setStartLogging(true);
          }}
          className="login-icon"
          src={loginImg}
        />
        <h1 className="app-name animate__animated animate__fadeInDown">
          Palmira
        </h1>
        <h2 className="app-slogan animate__animated animate__fadeInDown">
          Assistencia virtual de proximidad para quien mas quieres
        </h2>
      </div>
      {startLogging ? (
        <div className="forms-container animate__animated animate__fadeIn">
          <h1
            onClick={() => {
              setStartLogging(false);
            }}
            className="close-btn"
          >
            x
          </h1>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <h1>ENTRA</h1>
            <input
              type="text"
              name="lemail"
              value={loginValues.lemail}
              onChange={handleLoginChange}
              placeholder="Email del cuidador"
            />
            <input
              type="password"
              name="lpassword"
              value={loginValues.lpassword}
              onChange={handleLoginChange}
              placeholder="Contraseña"
            />
            {!isLoginLoading ? (
              <button type="submit">Entra</button>
            ) : (
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </form>
        </div>
      ) : null}
      <div className="privacy-container">
        <h1>Política de privacidad</h1>

        <p>
          Política de privacidad Última revisión: 19 de mayo de 2020 Esta
          política de privacidad ("Política") se aplica a la aplicación Palmira
          La Política está diseñada para informarle cómo recopilamos y usamos la
          información personal (como se define a continuación) para que pueda
          tomar una decisión informada sobre el uso del servicio Palmira. <br />{" "}
          <br />
          Lea esta declaración antes de enviarnos cualquier información
          personal. Al usar nuestro Sitio y servicio, usted declara que: tiene
          18 años o más, está utilizando nuestra aplicación para fines lícitos,
          y acepta las prácticas de recopilación, uso y retención de información
          descritas en esta Política. UE-EE. UU. y Suiza-EE.UU. Escudo de
          privacidad Palmira cumple con la UE-EE.UU. Marco del Escudo de
          privacidad y Suiza-EE. UU. Marco del Escudo de Privacidad según lo
          establecido por el Departamento de Comercio de EE. UU. con respecto a
          la recopilación, el uso y la retención de información personal
          transferida desde la Unión Europea y Suiza a los Estados Unidos. Si
          existe algún conflicto entre los términos de esta política de
          privacidad y los Principios del Escudo de Privacidad, prevalecerán los
          Principios del Escudo de Privacidad. Para obtener más información
          sobre el programa Privacy Shield y para ver nuestra certificación,
          visite https://www.privacyshield.gov/. De conformidad con los
          Principios del Escudo de privacidad, Palmira se compromete a resolver
          las quejas sobre nuestra recopilación o uso de su información
          personal. <br /> <br />
          Las personas de la Unión Europea y Suiza que tengan consultas o quejas
          sobre nuestra política de protección de la privacidad deben
          comunicarse primero con Palmira en: palmiratecuida@gmail.com EE.UU
          Palmira se compromete a cooperar con el panel establecido por las
          autoridades de protección de datos (DPA) de la UE y el Comisionado
          Federal de Información y Protección de Datos de Suiza, y cumplir con
          los consejos brindados por el panel y el Comisionado con respecto a
          los datos transferidos desde la UE y Suiza. El marco del Escudo de la
          privacidad UE-EE. UU. y Suiza-EE. UU. Privacy Shield Framework permite
          la transferencia de información personal a un tercero, que actúa como
          proveedor de servicios o vendedor, si se toman ciertas medidas para
          garantizar la protección de la privacidad y la seguridad. En estas
          circunstancias, tomaremos todas las medidas razonables para exigir a
          cualquier tercero destinatario que proteja su información personal
          relevante para el marco del Escudo de privacidad. En los casos de
          transferencia posterior a terceros de datos de personas de la UE y
          Suiza recibidos de conformidad con el Escudo de privacidad UE-EE. UU.
          y Suiza-EE. UU., Palmira es potencialmente responsable. Derechos de
          los residentes de la UE en virtud del Reglamento general de protección
          de datos <br /> <br />
          El Reglamento General de Protección de Datos (GDPR) proporciona a los
          interesados ​​(usted, si utiliza el servicio Palmira) que residen en
          la Unión Europea ciertos derechos. Estos derechos son: <br /> <br />
          1) El derecho a ser informado. Tiene derecho a conocer los propósitos
          del procesamiento de sus datos personales, cuánto tiempo se
          conservarán y con quién se compartirán. <br /> <br />
          2) El derecho de acceso. Tiene derecho a acceder a sus datos
          personales. <br /> <br />
          3) El derecho de rectificación. Tiene derecho a que se rectifiquen o
          completen los datos personales inexactos si están incompletos. <br />{" "}
          <br />
          4) El derecho de supresión. Tiene derecho a que se eliminen sus datos
          personales en determinadas circunstancias, también conocido como
          “derecho al olvido”. <br /> <br />
          5) El derecho a restringir el procesamiento. Tiene derecho a solicitar
          la limitación del tratamiento de sus datos personales en determinadas
          circunstancias. <br /> <br />
          6) El derecho a la portabilidad de los datos. Tiene derecho a recibir
          los datos personales que ha proporcionado a un controlador y que se
          transmitan a otro controlador. <br /> <br />
          7) El derecho de oposición. Tiene derecho a oponerse al procesamiento
          de sus datos personales en determinadas circunstancias. <br /> <br />
          8) Derechos relacionados con la toma de decisiones individuales
          automatizadas y elaboración de perfiles. Palmira no participa en la
          elaboración de perfiles ni en la toma de decisiones individual
          automatizada. Puede ejercer los derechos anteriores enviando un correo
          electrónico a palmiratecuida@gmail.com <br /> <br />
          ¿Qué es la información personal? <br /> <br />
          Tal como se usa en el presente, el término "información personal"
          significa información que identifica a una persona o a partir de la
          cual se podría identificar a una persona (como nombre, dirección,
          número de teléfono, número de teléfono móvil, dirección de correo
          electrónico, número de tarjeta de crédito u otro número de cuenta) e
          información sobre la <strong>ubicación</strong> o las actividades de
          esa persona, como información sobre su uso del servicio Palmira. La
          información personal también incluye datos demográficos información
          específica como fecha de nacimiento, género, área geográfica y
          preferencias cuando dicha información esté vinculada a otra
          información personal que lo identifique. La información personal no
          incluye información "agregada", que son los datos que recopilamos
          sobre el uso del Sitio o el servicio o las categorías de usuarios del
          Sitio y del servicio, de los cuales se ha eliminado cualquier
          información personal. Esta Política de ninguna manera limita o
          restringe nuestra recopilación de información agregada. <br /> <br />
          ¿Qué información personal recopilamos? <br /> <br />
          La información personal se puede recopilar de varias maneras cuando
          utiliza los diversos servicios y actividades disponibles a través del
          Sitio y el servicio de Palmira. En varios lugares de nuestra
          aplicación móvil, podemos recopilar cierta información que nos
          proporciona voluntariamente que puede contener información personal,
          como la información de contacto de su destinatario, p. nombre,
          apellido, dirección de correo electrónico y/o número de teléfono.
          Cuando utiliza nuestra aplicación, tiene la opción de proporcionarnos
          un nombre de usuario.{" "}
          <strong>
            Cuando está encendido y con Palmira activo o en segundo plano
          </strong>
          , la aplicación Palmira recopilará automáticamente información de{" "}
          <strong>ubicación</strong> de su dispositivo móvil. Tratamos la
          información recopilada junto con la aplicación como información
          personal si la combinamos o la vinculamos con cualquiera de la
          información de identificación mencionada anteriormente. A menos que
          nos indique que actuemos de otra manera, Palmira almacena la
          información de su <strong>ubicación</strong> personal. Si ya no desea
          permitirnos recopilar y usar su información de{" "}
          <strong>ubicación</strong>, puede suspender el uso del servicio.
          Archivos de registro Como sucede con la mayoría de los sitios web,
          recopilamos cierta información automáticamente y la almacenamos en
          archivos de registro. Esta información puede incluir direcciones de
          protocolo de Internet (IP), tipo de navegador, proveedor de servicios
          de Internet (ISP), páginas de referencia/salida, sistema operativo,
          sello de fecha/hora y/o datos de flujo de clics. No vinculamos estos
          datos recopilados automáticamente con otra información que recopilamos
          sobre usted. <br /> <br />
          Análisis móvil <br /> <br />
          Utilizamos software de análisis móvil para permitirnos comprender
          mejor la funcionalidad de nuestro Software móvil en su teléfono. Este
          software puede registrar información como la frecuencia con la que usa
          la aplicación, los eventos que ocurren dentro de la aplicación, el uso
          agregado, los datos de rendimiento y desde dónde se descargó la
          aplicación. No vinculamos la información que almacenamos dentro del
          software de análisis con ninguna información de identificación
          personal que envíe dentro de la aplicación móvil. <br /> <br />
          Notificaciones push
          <br /> <br />
          Es posible que le enviemos notificaciones automáticas de vez en cuando
          para actualizarlo. sobre cualquier actualización, evento o promoción
          que podamos estar realizando. Si no desea recibir este tipo de
          comunicaciones, puede desactivarlas a nivel de dispositivo. Para
          garantizar que reciba las notificaciones adecuadas, necesitaremos
          recopilar cierta información sobre su dispositivo, como el sistema
          operativo y la información de identificación del usuario. <br />{" "}
          <br /> Uso y divulgación <br /> <br /> En general, usamos la
          información personal que podemos recopilar (como su nombre,{" "}
          <strong>ubicación</strong>) para facilitar su uso de la aplicación
          móvil y el servicio Palmira, para brindarle la información, los
          productos y los servicios que solicita, para administrar y ayudar.
          nosotros con el funcionamiento del Sitio, nuestra aplicación y para
          cualquier otro propósito para el cual se proporcionó la información.
          Por ejemplo, podemos usar la información que recopilamos: <br />{" "}
          <br />– para responder a sus correos electrónicos, envíos,
          comentarios, solicitudes o quejas; <br /> <br />– para asegurarse de
          que la aplicación funciona correctamente y de que recibe la versión
          más reciente; <br /> <br />– para permitir que otros usuarios del
          servicio que usted designe vean temporalmente su paradero en tiempo
          real; <br /> <br />– para solicitar comentarios y permitirnos
          desarrollar, personalizar y mejorar el Sitio y nuestra información y
          servicios; y <br /> <br />– para el propósito específico para el cual
          se proporcionó la información. <br /> <br />
          ¿Qué información personal compartimos con terceros? <br /> <br />
          No vendemos, compartimos ni alquilamos ninguna información personal a
          terceros de ninguna manera diferente a lo que se divulga en esta
          Política. Solamente se almacena la información en un servicio de base
          de datos externo. Podemos divulgar información personal cuando estemos
          obligados a cumplir con la ley (por ejemplo, una citación legal, orden
          judicial u orden judicial); para hacer cumplir o aplicar esta política
          de privacidad o nuestras otras políticas o acuerdos; para iniciar,
          rendir, facturar y cobrar los montos que se nos adeudan; para proteger
          nuestros derechos, propiedad o seguridad o los de nuestros clientes;
          para proteger a nuestros clientes del uso fraudulento, abusivo o
          ilegal de nuestra aplicación; o si creemos que una emergencia que
          implica el peligro de muerte o lesiones físicas graves para cualquier
          persona requiere la divulgación de las comunicaciones o justifica la
          divulgación de información personal. Además, la información sobre
          nuestros clientes, incluida la información personal, puede divulgarse
          como parte de cualquier fusión o adquisición. ¿Dónde se almacena su
          información? Palmira. tiene su sede en España y, por lo tanto,
          cualquier información que recopilemos sobre usted o que nos
          proporcione puede transferirse a España. Algunos de nuestros
          proveedores de servicios también pueden estar ubicados en los Estados
          Unidos o en otros países. Si está utilizando la aplicación en los
          estados unidos, acepta que su información personal se transfiera fuera
          de los estados unidos, incluso a países donde puede tener menos
          derechos legales. Su información personal se mantiene estrictamente
          confidencial y no se compartirá ni venderá a terceros que no sean como
          se describe expresamente en esta Política de privacidad (consulte
          "¿Qué información personal compartimos con terceros?"), o a su usuario
          Palmira. Si nos proporciona sus datos de contacto como parte de su uso
          del Sitio o la aplicación, podemos enviarle noticias y actualizaciones
          de productos relacionadas con Palmira. Palmira limita el uso de su
          información personal a los fines indicados en este documento. <br />{" "}
          <br />
          ¿Cómo puede corregir y actualizar su información personal u obtener
          información adicional? <br /> <br />
          Si lo solicita, le proporcionaremos información sobre si conservamos
          su información personal. Si tiene alguna pregunta o comentario sobre
          esta Política o las prácticas relacionadas con nuestro servicio,
          contáctenos en palmiratecuida@gmail.com. Si desea verificar, corregir
          o eliminar cualquiera de sus datos personales que pueda recopilar
          Palmira, envíe su solicitud por correo electrónico a
          palmiratecuida@gmail.com. Todas las solicitudes enviadas a
          palmiratecuida@gmail.com se procesarán dentro de un plazo razonable.{" "}
          <br /> <br />
          Retención de datos <br /> <br /> Cualquier información proporcionada
          por usted en relación con una cuenta de usuario de Palmira se
          conservará mientras su cuenta esté activa o según sea necesario para
          brindarle servicios. Podemos retener y usar su información según sea
          necesario para cumplir con nuestras obligaciones legales, resolver
          disputas y hacer cumplir nuestros acuerdos. Es posible que se le
          solicite a Palmira que divulgue información personal en respuesta a
          solicitudes legales de las autoridades públicas, incluso para cumplir
          con los requisitos de seguridad nacional o de aplicación de la ley.
          Residentes de California: A partir del 1 de enero de 2020, en virtud
          de la Ley de Privacidad del Consumidor de California (CCPA), los
          residentes de California tienen derecho a solicitar la siguiente
          información de Palmira enviando un correo electrónico a Palmira a
          palmiratecuida@gmail.com y Palmira le proporcionará dicha información
          una vez que verifique su solicitud. : <br /> <br />• Las categorías de
          información personal que Palmira recopila sobre usted; <br /> <br />•
          Las categorías de fuentes de las que se recopila su información
          personal; <br /> <br />• El propósito comercial para recopilar su
          información personal; <br /> <br />• Las categorías de terceros con
          quienes Palmira comparte su información personal; y <br /> <br /> •
          Los datos personales específicos que Palmira ha recopilado sobre
          usted. <br /> <br />
          Además, puede encontrar la siguiente información en las secciones
          correspondientes de la Política de privacidad de Palmira: Si opta por
          ejercer alguno de sus derechos en virtud de la CCPA, Palmira no negará
          los servicios, no proporcionará un precio o tarifa diferente para
          nuestros servicios, ni le brindará un nivel de servicio diferente
          porque usted ejerció dichos derechos. Según la definición actual de
          CCPA, Palmira no vende su información personal. <br /> <br />
          Ventas de información personal <br /> <br /> En los doce (12) meses
          anteriores, Palmira no ha vendido información personal. Según la
          definición actual de CCPA, Palmira no vende ninguna información
          personal. <br /> <br />
          Derechos de solicitud de eliminación <br /> <br />
          Tiene derecho a solicitar que Palmira elimine cualquier parte de su
          información personal que hayamos recopilado y retenido, sujeto a
          ciertas excepciones. Una vez que recibamos y confirmemos su solicitud
          de consumidor verificable (consulte Ejercicio de los derechos de
          acceso, portabilidad de datos y eliminación), eliminaremos (e
          indicaremos a nuestros proveedores de servicios que eliminen) su
          información personal de nuestros registros, a menos que se aplique una
          excepción. Podemos denegar su solicitud de eliminación si es necesario
          que nosotros o nuestro(s) proveedor(es) de servicios retengamos la
          información para: <br /> <br />
          1. Completar la transacción para la cual recopilamos la información
          personal, brindar un servicio que solicitó, tomar medidas
          razonablemente anticipadas dentro del contexto de nuestra relación
          comercial en curso con usted o cumplir nuestro contrato con usted.{" "}
          <br /> <br />
          2. Detectar incidentes de seguridad, proteger contra actividades
          maliciosas, engañosas, fraudulentas o ilegales, o enjuiciar a los
          responsables de tales actividades. <br /> <br /> 3. Depurar productos
          para identificar y reparar errores que perjudiquen la funcionalidad
          prevista existente. <br /> <br />
          4. Ejercer la libertad de expresión, garantizar el derecho de otro
          consumidor a ejercer sus derechos de libertad de expresión, o ejercer
          otro derecho previsto en el código legislativo. <br /> <br />
          5. Cumplir con la Ley de Privacidad de Comunicaciones Electrónicas de
          California (Cal. Penal Code § 1546 et. seq.). <br /> <br />
          6. Participar en investigaciones científicas, históricas o
          estadísticas públicas o revisadas por pares en interés público que se
          adhieran a todas las demás leyes de ética y privacidad aplicables,
          cuando la eliminación de la información probablemente imposibilite o
          perjudique gravemente el logro de la investigación, si usted
          proporcionó previamente consentimiento informado. <br /> <br />
          7. Permitir únicamente usos internos que estén razonablemente
          alineados con las expectativas del consumidor en función de su
          relación con nosotros. <br /> <br />
          8. Cumplir con una obligación legal. <br /> <br />
          9. Hacer otros usos internos y lícitos de esa información que sean
          compatibles con el contexto en el que la proporcionó. <br /> <br />
          Para ejercer los derechos de acceso, portabilidad de datos y
          eliminación descritos anteriormente, envíenos una solicitud de
          consumidor verificable a través de: <br /> <br />• Enviándonos un
          correo electrónico a palmiratecuida@gmail.com <br /> <br />
          Solo usted, o una persona registrada en la Secretaría de Estado de
          California que autorice para actuar en su nombre, puede realizar una
          solicitud de consumidor verificable relacionada con su información
          personal. <br /> <br />
          Puede utilizar un agente autorizado para enviar una solicitud de
          información o una solicitud de eliminación en su nombre. Un agente
          autorizado es una persona o empresa registrada con la Secretaría de
          Estado de California que usted ha autorizado para actuar en su nombre
          para realizar una solicitud de información o una solicitud de
          eliminación de acuerdo con la Ley de Privacidad del Consumidor de
          California. Solo puede realizar una solicitud de consumidor
          verificable de acceso o portabilidad de datos dos veces en un período
          de 12 meses. <br /> <br />
          La solicitud verificable del consumidor debe: <br /> <br />•
          Proporcionar información suficiente que nos permita verificar
          razonablemente que usted es la persona sobre la que recopilamos
          información personal o un representante autorizado. <br /> <br />•
          Describir su solicitud con suficiente detalle que nos permita
          comprenderla, evaluarla y responderla adecuadamente. No podemos
          responder a su solicitud ni brindarle información personal si no
          podemos verificar su identidad o autoridad para realizar la solicitud
          y confirmar que la información personal se relaciona con usted. <br />{" "}
          <br />
          Solo utilizaremos la información personal proporcionada en una
          solicitud de consumidor verificable para verificar la identidad del
          solicitante o la autoridad para realizar la solicitud. <br /> <br />
          Tiempo y formato de respuesta <br /> <br />
          Nos esforzamos por responder a una solicitud de consumidor verificable
          dentro de los cuarenta y cinco (45) días posteriores a su recepción.
          Si requerimos más tiempo (hasta 90 días), le informaremos el motivo y
          el período de extensión por escrito. Cualquier divulgación que
          proporcionemos solo cubrirá el período de 12 meses anterior a la
          recepción de la solicitud verificable del consumidor. La respuesta que
          proporcionemos también explicará las razones por las que no podemos
          cumplir con una solicitud, si corresponde. <br /> <br />
          Para las solicitudes de portabilidad de datos, seleccionaremos un
          formato para proporcionar su información personal que sea fácilmente
          utilizable y que le permita transmitir la información de una entidad a
          otra sin obstáculos. No cobramos una tarifa para procesar o responder
          a su solicitud de consumidor verificable a menos que sea excesiva,
          repetitiva o manifiestamente infundada. <br /> <br />
          Si determinamos que la solicitud justifica una tarifa, le informaremos
          por qué tomamos esa decisión y le proporcionaremos un costo estimado
          antes de completar su solicitud. Cambios en esta Declaración de
          privacidad Podemos actualizar esta declaración de privacidad para
          reflejar cambios en nuestras prácticas de información. <br /> <br />
          Si realizamos cambios importantes, se lo notificaremos mediante la
          publicación de la política de privacidad revisada en nuestro Sitio o,
          si ha establecido una cuenta de usuario de Palmira, le enviaremos una
          notificación a la dirección de correo electrónico especificada en su
          cuenta. Cualquier revisión de nuestra política de privacidad entrará
          en vigencia después de dicha notificación. <br /> <br />
          Le recomendamos que revise periódicamente esta página para obtener la
          información más reciente sobre nuestras prácticas de privacidad.
        </p>
      </div>
    </div>
  );
};
